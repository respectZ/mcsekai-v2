import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import { Character } from "./character";
import { Camera, Keyframe, Songs } from "./song";

export const SongManager = {
  typeId: "mcsekai:song_manager",
  jobs: <number[]> [],
  ui: {
    main(songManager: mc.Entity, player: mc.Player) {
      const form = new ui.ModalFormData();

      form.title(`mcsekai.form.select_song`);
      form.dropdown(`mcsekai.form.song`, Object.keys(Songs).map((songId) => `mcsekai.song.${songId}`), 0);

      form.show(player).then((response) => {
        if (!response.formValues || response.canceled) return;
        if (!songManager.isValid() || !player.isValid()) return;

        const index = response.formValues[0] as number;
        const songId = Object.keys(Songs)[index];

        SongManager.ui.songConfig(songManager, player, songId);
      });
    },
    songConfig(songManager: mc.Entity, player: mc.Player, song: string) {
      const form = new ui.ModalFormData();

      form.title(`mcsekai.song.${song}`);

      const characters = Object.keys(Character).map((group) => {
        return Object.keys(Character[group]).map((id) => `entity.${Character[group][id]}.name`);
      }).flat();

      Songs[song].characters.forEach((characterId: string, index: number) => {
        const chIndex = characters.indexOf(`entity.${characterId}.name`);

        form.dropdown(
          { translate: `mcsekai.form.character`, with: { rawtext: [{ text: `${index + 1} ` }] } },
          characters,
          chIndex,
        );
      });

      form.show(player).then((response) => {
        if (!response.formValues || response.canceled) return;
        if (!songManager.isValid() || !player.isValid()) return;

        const selectedCharacters = response.formValues.map((value) => {
          const ch = characters[value as number];
          const chId = ch.split("entity.")[1].split(".name")[0];
          return chId;
        });

        SongManager.playSong(songManager, player, song, selectedCharacters);
      });
    },
  },
  playSong(songManager: mc.Entity, player: mc.Player, song: string, characters: string[]) {
    const view = songManager.getViewDirection();
    const location = songManager.location;
    location.x += view.x * 10;
    location.z += view.z * 10;

    for (const [index, character] of characters.entries()) {
      const chara = songManager.dimension.spawnEntity(character, location);
      chara.triggerEvent(`mcsekai:song_character.${index + 1}`);
      chara.triggerEvent(`mcsekai:song.${song}`);
      chara.triggerEvent(`mcsekai:song.start`);
    }

    // player.runCommand(`function songs/${song}/run`);
    player.runCommand(`playsound mcsekai.song.${song} @a`);
    player.runCommand("hud @s hide all");
    // player.playMusic(`mcsekai.song.${song}`);
    player.addEffect("invisibility", 1e5, { showParticles: false });
    songManager.addEffect("invisibility", 1e5, { showParticles: false });

    const camera = Songs[song].camera;
    if (camera) {
      SongManager.playCamera(songManager, player, camera);
    }
  },
  playCamera(songManager: mc.Entity, player: mc.Player, camera: Camera) {
    const pos = songManager.location;
    pos.y -= 1;

    const view = songManager.getViewDirection();
    pos.x += view.x * 10.2;
    pos.z += view.z * 10.2;

    for (const [time, k] of Object.entries(camera)) {
      const keyframe = k as Keyframe;
      const { rotation, easeOptions } = keyframe;

      const loc = JSON.parse(JSON.stringify(keyframe.location));

      if (loc) {
        loc.x += pos.x;
        loc.y += pos.y;
        loc.z += pos.z;
        // pos.x += location.x;
        // pos.y += location.y;
        // pos.z += location.z;
      }

      const t = parseFloat(time);
      const id = mc.system.runTimeout(() => {
        player.camera.setCamera("minecraft:free", {
          easeOptions,
          location: loc,
          rotation,
        });
      }, t);
      SongManager.jobs.push(id);
    }
  },
  stop(player: mc.Player) {
    player.runCommand("stopsound @a");
    player.runCommand("hud @s reset");
    const entities = player.dimension.getEntities({
      families: ["mcsekai"],
    });
    for (const entity of entities) {
      entity.remove();
    }
    player.removeEffect("invisibility");
    for (const job of SongManager.jobs) {
      mc.system.clearRun(job);
    }
    SongManager.jobs = [];
    mc.system.runTimeout(() => {
      player.camera.clear();
    }, mc.TicksPerSecond);
  },
};

const namespace = "mcsekai";
mc.system.afterEvents.scriptEventReceive.subscribe(({ id, sourceEntity }) => {
  if (!(sourceEntity instanceof mc.Player)) return;
  const songManager = sourceEntity.dimension.getEntities(
    {
      type: SongManager.typeId,
      closest: 1,
      location: sourceEntity.location,
    },
  )[0];
  if (!songManager) return;

  switch (id) {
    case `${namespace}:song.trigger`:
      SongManager.ui.main(songManager, sourceEntity);
      break;
    case `${namespace}:song.stop`:
      SongManager.stop(sourceEntity);
      break;
  }
}, { namespaces: [namespace] });
