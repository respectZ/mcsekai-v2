import * as mc from "@minecraft/server";
import { Character } from "./character";
import * as CameraData from "./camera";

export interface Camera {
  [key: string]: Keyframe;
}

export interface Keyframe {
  location?: mc.Vector3;
  rotation: mc.Vector2;
  easeOptions?: mc.CameraEaseOptions;
}

interface Cameras {
  [key: string]: Camera;
}

interface Songs {
  [key: string]: Song;
}

interface Song {
  characters: string[];
  camera?: Camera;
}

export const Songs: Songs = {
  "0001": {
    characters: [
      Character.vsinger.hatsune_miku,
    ],
    camera: CameraData.camera0001,
  },
  "0398": {
    characters: [
      Character.vbs.azusawa_kohane,
      Character.vbs.shiraishi_an,
      Character.vbs.shinonome_akito,
      Character.vbs.aoyagi_toya,
      Character.vbs.miku,
    ],
    camera: CameraData.camera0398,
  },
  "0441": {
    characters: [
      Character.vbs.azusawa_kohane,
      Character.vbs.shiraishi_an,
      Character.vbs.shinonome_akito,
      Character.vbs.aoyagi_toya,
      Character.vbs.meiko,
    ],
    camera: CameraData.camera0441,
  },
};
