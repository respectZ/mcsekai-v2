const toId = (group: string, id: string) => `mcsekai:${group}.${id}`;

export const Character = {
  vsinger: {
    hatsune_miku: toId("vsinger", "hatsune_miku"),
    kagamine_len: toId("vsinger", "kagamine_len"),
    kagamine_rin: toId("vsinger", "kagamine_rin"),
    kaito: toId("vsinger", "kaito"),
    meiko: toId("vsinger", "meiko"),
    megurine_luka: toId("vsinger", "megurine_luka"),
  },
  nigo: {
    kanade: toId("nigo", "kanade"),
    mafuyu: toId("nigo", "mafuyu"),
    mizuki: toId("nigo", "mizuki"),
    ena: toId("nigo", "ena"),

    miku: toId("nigo", "miku"),
    kagamine_len: toId("nigo", "kagamine_len"),
    kagamine_rin: toId("nigo", "kagamine_rin"),
    kaito: toId("nigo", "kaito"),
    meiko: toId("nigo", "meiko"),
    megurine_luka: toId("nigo", "megurine_luka"),
  },
  vbs: {
    aoyagi_toya: toId("vbs", "aoyagi_toya"),
    azusawa_kohane: toId("vbs", "azusawa_kohane"),
    shinonome_akito: toId("vbs", "shinonome_akito"),
    shiraishi_an: toId("vbs", "shiraishi_an"),

    miku: toId("vbs", "hatsune_miku"),
    kagamine_len: toId("vbs", "kagamine_len"),
    kagamine_rin: toId("vbs", "kagamine_rin"),
    kaito: toId("vbs", "kaito"),
    meiko: toId("vbs", "meiko"),
    megurine_luka: toId("vbs", "megurine_luka"),
  },
  leoni: {
    hinomori_shiho: toId("leoni", "hinomori_shiho"),
    hoshino_ichika: toId("leoni", "hoshino_ichika"),
    mochizuki_honami: toId("leoni", "mochizuki_honami"),
    tenma_saki: toId("leoni", "tenma_saki"),

    miku: toId("leoni", "hatsune_miku"),
    kagamine_len: toId("leoni", "kagamine_len"),
    kagamine_rin: toId("leoni", "kagamine_rin"),
    kaito: toId("leoni", "kaito"),
    meiko: toId("leoni", "meiko"),
    megurine_luka: toId("leoni", "megurine_luka"),
  },
  mmj: {
    hinomori_shizuku: toId("mmj", "hinomori_shizuku"),
    hanasato_minori: toId("mmj", "hanasato_minori"),
    kiritani_haruka: toId("mmj", "kiritani_haruka"),
    momo_airi: toId("mmj", "momo_airi"),

    miku: toId("mmj", "hatsune_miku"),
    kagamine_len: toId("mmj", "kagamine_len"),
    kagamine_rin: toId("mmj", "kagamine_rin"),
    kaito: toId("mmj", "kaito"),
    meiko: toId("mmj", "meiko"),
    megurine_luka: toId("mmj", "megurine_luka"),
  },
  wxs: {
    kamishiro_rui: toId("wxs", "kamishiro_rui"),
    otori_emu: toId("wxs", "otori_emu"),
    tenma_tsukasa: toId("wxs", "tenma_tsukasa"),
    kusanagi_nene: toId("wxs", "kusanagi_nene"),

    miku: toId("wxs", "hatsune_miku"),
    kagamine_len: toId("wxs", "kagamine_len"),
    kagamine_rin: toId("wxs", "kagamine_rin"),
    kaito: toId("wxs", "kaito"),
    meiko: toId("wxs", "meiko"),
    megurine_luka: toId("wxs", "megurine_luka"),
  },
};
