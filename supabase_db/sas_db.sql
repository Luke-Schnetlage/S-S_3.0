create table
  public.player (
    playerid bigint generated by default as identity not null,
    username character varying not null default 'NOT NULL'::character varying,
    password character varying null default 'NOT NULL'::character varying,
    constraint player_pkey primary key (playerid),
    constraint player_username_key unique (username)
  ) tablespace pg_default;
  
  create table
  public.result (
    resultid bigint generated by default as identity not null,
    win_res boolean null,
    constraint result_pkey primary key (resultid)
  ) tablespace pg_default;
  
  create table
  public.game (
    gameid bigint generated by default as identity not null,
    round_start timestamp with time zone null default now(),
    start_playerid bigint not null,
    join_playerid bigint not null,
    result bigint not null,
    constraint game_pkey primary key (gameid),
    constraint game_join_playerid_fkey foreign key (join_playerid) references player (playerid),
    constraint game_result_fkey foreign key (result) references result (resultid),
    constraint game_start_playerid_fkey foreign key (start_playerid) references player (playerid)
  ) tablespace pg_default;
  
  create table
  public.energy (
    energyid bigint generated by default as identity not null,
    energy_type text not null,
    constraint energy_pkey primary key (energyid),
    constraint energy_energy_type_key unique (energy_type)
  ) tablespace pg_default;
  
  create table
  public.card (
    cardid bigint generated by default as identity not null,
    card_name text not null,
    card_type text not null,
    energy_type text null,
    constraint card_pkey primary key (cardid),
    constraint card_card_name_key unique (card_name),
    constraint card_energy_type_fkey foreign key (energy_type) references energy (energy_type)
  ) tablespace pg_default;
  
  create table
  public.minion (
    minionid bigint generated by default as identity not null,
    minion_name text not null,
    energy_type text not null,
    summon_cost integer null,
    start_pow integer null,
    atk_cost integer null,
    constraint minion_pkey primary key (minionid),
    constraint minion_energy_type_fkey foreign key (energy_type) references energy (energy_type),
    constraint minion_minion_name_fkey foreign key (minion_name) references card (card_name)
  ) tablespace pg_default;
  
  create table
  public.spell (
    spellid bigint generated by default as identity not null,
    invocation_name text null,
    energy_type text null,
    fast_cost integer null,
    slow_time integer null,
    constraint spell_pkey primary key (spellid),
    constraint spell_energy_type_fkey foreign key (energy_type) references energy (energy_type),
    constraint spell_invocation_name_fkey foreign key (invocation_name) references card (card_name)
  ) tablespace pg_default;
  
  create table
  public.terrain (
    terrainid bigint generated by default as identity not null,
    energy_type text null,
    constraint terrain_pkey primary key (terrainid),
    constraint terrain_energy_type_fkey foreign key (energy_type) references energy (energy_type)
  ) tablespace pg_default;
  
  create table
  public.zone_trait (
    zoneid bigint generated by default as identity not null,
    zone_type character varying null,
    constraint zone_trait_pkey primary key (zoneid)
  ) tablespace pg_default;
  
  create table
  public.contested_zone (
    contested_zoneid bigint generated by default as identity not null,
    zoneid bigint not null,
    zone1_slot integer null,
    zone2_slot integer null,
    zone3_slot integer null,
    zone1_effect character varying null,
    zone2_effect character varying null,
    zone3_effect character varying null,
    revealed1 boolean null,
    revealed2 boolean null,
    revealed3 boolean null,
    constraint contested_zone_pkey primary key (contested_zoneid),
    constraint contested_zone_zoneid_fkey foreign key (zoneid) references zone_trait (zoneid)
  ) tablespace pg_default;
  
  create table
  public.hand (
    handid bigint generated by default as identity not null,
    playerid bigint not null,
    gameid bigint not null,
    constraint hand_pkey primary key (handid),
    constraint hand_gameid_fkey foreign key (gameid) references game (gameid),
    constraint hand_playerid_fkey foreign key (playerid) references player (playerid)
  ) tablespace pg_default;
  
  create table
  public.cards_in_deck (
    card_space bigint generated by default as identity not null,
    cardid bigint null,
    playerid bigint null,
    gameid bigint null,
    constraint cards_in_deck_pkey primary key (card_space),
    constraint cards_in_deck_cardid_fkey foreign key (cardid) references card (cardid),
    constraint cards_in_deck_gameid_fkey foreign key (gameid) references game (gameid),
    constraint cards_in_deck_playerid_fkey foreign key (playerid) references player (playerid)
  ) tablespace pg_default;
  
  create table
  public.deck_list (
    deckid bigint generated by default as identity not null,
    cardid bigint null,
    quantity bigint not null,
    constraint deck_list_pkey primary key (deckid),
    constraint deck_list_cardid_fkey foreign key (cardid) references card (cardid)
  ) tablespace pg_default;
  
  create table
  public.discard (
    discardid bigint generated by default as identity not null,
    playerid bigint not null,
    gameid bigint not null,
    constraint discard_pkey primary key (discardid),
    constraint discard_gameid_fkey foreign key (gameid) references game (gameid),
    constraint discard_playerid_fkey foreign key (playerid) references player (playerid)
  ) tablespace pg_default;
  
  create table
  public.board (
    boardid bigint generated by default as identity not null,
    playerid bigint not null,
    gameid bigint not null,
    cardid bigint not null,
    handid bigint not null,
    discardid bigint not null,
    cards_in_deckid bigint not null,
    deck_listid bigint not null,
    contested_zoneid bigint not null,
    minion1 integer null,
    minion2 integer null,
    minion3 integer null,
    invocation1 integer null,
    invocation2 integer null,
    invocation3 integer null,
    terrainid bigint not null,
    active_terrain integer null,
    spent_terrain integer null,
    health integer null,
    AFKwarnings integer null,
    constraint board_pkey primary key (boardid),
    constraint board_cards_in_deckid_fkey foreign key (cards_in_deckid) references cards_in_deck (card_space),
    constraint board_contested_zoneid_fkey foreign key (contested_zoneid) references contested_zone (contested_zoneid),
    constraint board_deck_listid_fkey foreign key (deck_listid) references deck_list (deckid),
    constraint board_discardid_fkey foreign key (discardid) references
    discard (discardid),
    constraint board_gameid_fkey foreign key (gameid) references game (gameid),
    constraint board_handid_fkey foreign key (handid) references hand (handid),
    constraint board_playerid_fkey foreign key (playerid) references player (playerid),
    constraint board_cardid_fkey foreign key (cardid) references card (cardid),
    constraint board_terrainid_fkey foreign key (terrainid) references terrain (terrainid)
  ) tablespace pg_default;