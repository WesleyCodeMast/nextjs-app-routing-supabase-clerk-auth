-- CreateTable
CREATE TABLE "casino_p_toplist" (
    "id" SERIAL NOT NULL,
    "geo" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "casino" INTEGER[],
    "def" INTEGER NOT NULL,
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "casino_p_toplist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbounding" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casinoId" INTEGER,
    "gameId" INTEGER,

    CONSTRAINT "outbounding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_filter_condition" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "casino_filter_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "toEmail" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "replyed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "contactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoutMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "parent" TEXT,
    "like" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "shoutMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_pbot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "tb_pbot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_pbot_shout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "tb_pbot_shout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "vote_up" INTEGER,
    "vote_down" INTEGER,
    "added" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER,
    "parentId" INTEGER,
    "postId" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "casinoId" INTEGER,
    "gameId" INTEGER,
    "newsId" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER,
    "parentId" INTEGER,
    "rating" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "casinoId" INTEGER,
    "gameId" INTEGER,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "vercel_image_store" TEXT,
    "image_backup" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_lvl" TEXT,
    "isAdmin" BOOLEAN DEFAULT false,
    "role" INTEGER DEFAULT 1,
    "afcRewards" INTEGER NOT NULL DEFAULT 0,
    "paypal_email" TEXT,
    "chest" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "vercel_image_url" TEXT,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "authorId" TEXT NOT NULL,
    "link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vb_user" (
    "userid" INTEGER NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "user_afc" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "vb_user_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "ScratchCardGame" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "outcome" TEXT[],
    "prize" TEXT,
    "chipset" TEXT[],
    "freePlay" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScratchCardGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScratchCardAward" (
    "id" SERIAL NOT NULL,
    "awarded" BOOLEAN NOT NULL,
    "usdAmount" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScratchCardAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "casino_p_bonus_lang" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "letters" TEXT NOT NULL,
    "deny" INTEGER,

    CONSTRAINT "casino_p_bonus_lang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_setting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "site_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_casinos" (
    "id" SERIAL NOT NULL,
    "aff_id" INTEGER,
    "casino" TEXT,
    "type" TEXT,
    "url" TEXT,
    "software" TEXT,
    "approved" INTEGER,
    "updated" TEXT,
    "hot" INTEGER,
    "new" INTEGER,
    "rogue" INTEGER,
    "button" TEXT,
    "blurb" TEXT,
    "softwareid" INTEGER NOT NULL,
    "telephone" TEXT,
    "contactemail" TEXT,
    "livechat" INTEGER,
    "mobile" INTEGER,
    "homepageimage" TEXT,
    "livegames" INTEGER,
    "clean_name" TEXT,
    "currencies" TEXT,
    "datialsupdate" INTEGER,
    "currency_val" INTEGER,
    "review_overall" INTEGER,
    "nodeposit" INTEGER,
    "freespins" INTEGER,
    "bonus_percent" INTEGER,
    "deposit" INTEGER,
    "vercel_image_url" TEXT,
    "vercel_image_size" INTEGER,
    "vercel_casino_button" TEXT,
    "vercel_casino_button_size" INTEGER,

    CONSTRAINT "casino_p_casinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_meta_casinos" (
    "m_id" SERIAL NOT NULL,
    "c_id" INTEGER NOT NULL,
    "s_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "casino_p_meta_casinos_pkey" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "casino_p_meta_games" (
    "m_id" SERIAL NOT NULL,
    "c_id" INTEGER NOT NULL,
    "s_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "casino_p_meta_games_pkey" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "casino_p_descriptions_casinos" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ordered" INTEGER,
    "type" INTEGER,
    "description_link" TEXT,
    "record" TEXT,

    CONSTRAINT "casino_p_descriptions_casinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_descriptions_games" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ordered" INTEGER,
    "type" INTEGER,
    "description_link" TEXT,
    "record" TEXT,

    CONSTRAINT "casino_p_descriptions_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_software" (
    "id" SERIAL NOT NULL,
    "software_name" TEXT,
    "status" INTEGER,
    "link" TEXT,
    "smallimage" TEXT,
    "image" TEXT,
    "show" INTEGER,
    "vercel_image_url" TEXT,
    "vercel_image_size" INTEGER,
    "slots_launch_id" INTEGER,

    CONSTRAINT "casino_p_software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_software_link" (
    "id" SERIAL NOT NULL,
    "casino" INTEGER,
    "software" INTEGER,

    CONSTRAINT "casino_p_software_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_games" (
    "game_id" SERIAL NOT NULL,
    "game_land_based" TEXT,
    "game_name" TEXT NOT NULL,
    "game_software" INTEGER NOT NULL,
    "game_added" TEXT,
    "game_progressive" INTEGER,
    "game_random_jackpot" INTEGER,
    "game_demo" TEXT,
    "game_min_bet" TEXT,
    "game_max_bet" TEXT,
    "game_line_bet" TEXT,
    "game_max_payout" TEXT,
    "game_bonus_bet" TEXT,
    "game_decks" INTEGER,
    "game_live_dealer" INTEGER,
    "game_reels" INTEGER,
    "game_lines" INTEGER,
    "game_multi_spin" INTEGER,
    "game_bonus_round" INTEGER,
    "game_bonus_multipliers" INTEGER,
    "game_scatters" INTEGER,
    "game_free_spins" INTEGER,
    "game_wild_slot" INTEGER,
    "game_theme" TEXT,
    "game_hands" INTEGER,
    "game_wild_cards" INTEGER,
    "status" INTEGER,
    "game_image" TEXT,
    "game_updated" TEXT,
    "game_clean_name" TEXT,
    "game_payout" TEXT,
    "game_fixed_bet" TEXT,
    "vercel_image_url" TEXT,
    "vercel_image_size" INTEGER,

    CONSTRAINT "casino_p_games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "casino_p_pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "option1" TEXT,
    "option2" TEXT,
    "typeof" TEXT,
    "mymeta" TEXT,
    "redirect" TEXT,

    CONSTRAINT "casino_p_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_lcb_juristrictions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "casino_p_lcb_juristrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_jurisdictions" (
    "jid" SERIAL NOT NULL,
    "casino_id" INTEGER,
    "jurisdiction_id" INTEGER NOT NULL,

    CONSTRAINT "casino_p_jurisdictions_pkey" PRIMARY KEY ("jid")
);

-- CreateTable
CREATE TABLE "casino_p_banks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "display" TEXT NOT NULL,
    "image" TEXT,
    "largeimage" TEXT,
    "description" TEXT,
    "rank" INTEGER,
    "status" INTEGER,
    "w" INTEGER,
    "h" INTEGER,
    "tw" INTEGER,
    "th" INTEGER,
    "link" TEXT,
    "vercel_image_url" TEXT,
    "vercel_image_size" INTEGER,
    "vercel_largeimage_url" TEXT,
    "vercel_largeimage_size" INTEGER,

    CONSTRAINT "casino_p_banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_bank_connect" (
    "id" INTEGER NOT NULL,
    "parent" INTEGER,
    "bank" INTEGER,
    "type" INTEGER,

    CONSTRAINT "casino_p_bank_connect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_bonus" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "game" TEXT,
    "freespins" INTEGER,
    "freeplay" TEXT,
    "nodeposit" INTEGER,
    "deposit" INTEGER,
    "deposit_amount" INTEGER,
    "name" TEXT,
    "comments" TEXT,
    "position" INTEGER,
    "code" TEXT,
    "active" INTEGER,
    "playthrough" INTEGER,
    "type" TEXT,
    "link" TEXT,
    "max_cashout" TEXT,
    "cashable" INTEGER,
    "exclusive" INTEGER,
    "added" TEXT,
    "update_main" INTEGER,
    "currency" TEXT,
    "multi_currency" TEXT,
    "wager" TEXT,
    "percent" INTEGER,
    "exported" TEXT,
    "geo" TEXT,
    "geo_deny" TEXT,

    CONSTRAINT "casino_p_bonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_games_image" (
    "game_image_id" SERIAL NOT NULL,
    "game_image_url" TEXT NOT NULL,
    "vercel_image_url" TEXT,
    "vercel_image_size" INTEGER,
    "game_image_alt_text" TEXT,
    "game_image_name" TEXT,
    "game_image_parent" INTEGER NOT NULL,
    "game_image_position" INTEGER,
    "w" INTEGER,
    "h" INTEGER,
    "tw" INTEGER,
    "th" INTEGER,
    "status" TEXT,

    CONSTRAINT "casino_p_games_image_pkey" PRIMARY KEY ("game_image_id")
);

-- CreateTable
CREATE TABLE "casino_p_slot_details" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "casino_p_slot_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_restrictions" (
    "id" SERIAL NOT NULL,
    "casino" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "allow" INTEGER,

    CONSTRAINT "casino_p_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_games_pros" (
    "id" SERIAL NOT NULL,
    "game" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "casino_p_games_pros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_games_cons" (
    "id" SERIAL NOT NULL,
    "game" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "casino_p_games_cons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_games_faq" (
    "id" SERIAL NOT NULL,
    "game" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "casino_p_games_faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_casino_pros" (
    "id" SERIAL NOT NULL,
    "casino" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "casino_p_casino_pros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_casino_cons" (
    "id" SERIAL NOT NULL,
    "casino" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "casino_p_casino_cons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_casino_faq" (
    "id" SERIAL NOT NULL,
    "casino" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "casino_p_casino_faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_subcontent" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "content_linked" TEXT,
    "title" TEXT,

    CONSTRAINT "casino_p_subcontent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casino_p_publish_categories" (
    "c_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" INTEGER,

    CONSTRAINT "casino_p_publish_categories_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "casino_p_publish_articles" (
    "a_id" INTEGER NOT NULL,
    "article" TEXT NOT NULL,
    "original" TEXT,
    "date" INTEGER,
    "status" INTEGER,
    "article_linked" TEXT,
    "image" TEXT,
    "title" TEXT,
    "code" TEXT,
    "alttext" TEXT,
    "votes" INTEGER,
    "url" TEXT,
    "fromcasino" INTEGER,
    "tweeted" INTEGER,
    "facebook" INTEGER,
    "google" INTEGER,
    "bonuscode" TEXT,
    "bonuspercent" INTEGER,
    "bonusamount" INTEGER,
    "maxcashout" INTEGER,
    "freespins" INTEGER,
    "bonusplaythrough" INTEGER,
    "exclusive" INTEGER,
    "nodeposit" INTEGER,
    "freetime" INTEGER,
    "playertype" INTEGER,
    "tournament" INTEGER,
    "startdate" TEXT,
    "enddate" TEXT,
    "userid" INTEGER,
    "afcpoints" INTEGER,
    "fubar" INTEGER,
    "emailcheck" INTEGER,
    "casino_id" INTEGER NOT NULL,
    "game_id" INTEGER,
    "groups" INTEGER[],
    "casino_name" TEXT,
    "game_ids" TEXT,
    "hash" TEXT,

    CONSTRAINT "casino_p_publish_articles_pkey" PRIMARY KEY ("a_id")
);

-- CreateTable
CREATE TABLE "slots_launch" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "thumb" TEXT,
    "provider_id" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_slug" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "type_slug" TEXT NOT NULL,
    "theme_id" INTEGER,
    "theme" TEXT,
    "theme_slug" TEXT,
    "megaways" INTEGER NOT NULL,
    "bonus_buy" INTEGER NOT NULL,
    "progressive" INTEGER NOT NULL,
    "featured" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "afc_id" INTEGER,

    CONSTRAINT "slots_launch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "casino_p_toplist_casino_idx" ON "casino_p_toplist"("casino");

-- CreateIndex
CREATE INDEX "casino_filter_condition_authorId_idx" ON "casino_filter_condition"("authorId");

-- CreateIndex
CREATE INDEX "tb_pbot_authorId_messageId_idx" ON "tb_pbot"("authorId", "messageId");

-- CreateIndex
CREATE INDEX "tb_pbot_shout_authorId_messageId_idx" ON "tb_pbot_shout"("authorId", "messageId");

-- CreateIndex
CREATE INDEX "Comments_parentId_type_authorId_gameId_newsId_idx" ON "Comments"("parentId", "type", "authorId", "gameId", "newsId");

-- CreateIndex
CREATE INDEX "Rating_parentId_type_authorId_gameId_idx" ON "Rating"("parentId", "type", "authorId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_role_idx" ON "users"("email", "role");

-- CreateIndex
CREATE INDEX "News_category_subCategory_authorId_idx" ON "News"("category", "subCategory", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "vb_user_email_key" ON "vb_user"("email");

-- CreateIndex
CREATE INDEX "vb_user_email_idx" ON "vb_user"("email");

-- CreateIndex
CREATE INDEX "ScratchCardGame_user_id_idx" ON "ScratchCardGame"("user_id");

-- CreateIndex
CREATE INDEX "ScratchCardAward_user_id_game_id_idx" ON "ScratchCardAward"("user_id", "game_id");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "site_setting_name_key" ON "site_setting"("name");

-- CreateIndex
CREATE INDEX "casino_p_casinos_id_nodeposit_freespins_deposit_bonus_perce_idx" ON "casino_p_casinos"("id", "nodeposit", "freespins", "deposit", "bonus_percent", "mobile", "livegames", "hot", "new", "approved", "rogue");

-- CreateIndex
CREATE INDEX "casino_p_meta_casinos_c_id_idx" ON "casino_p_meta_casinos"("c_id");

-- CreateIndex
CREATE INDEX "casino_p_meta_games_c_id_idx" ON "casino_p_meta_games"("c_id");

-- CreateIndex
CREATE INDEX "casino_p_descriptions_casinos_parent_idx" ON "casino_p_descriptions_casinos"("parent");

-- CreateIndex
CREATE INDEX "casino_p_descriptions_games_parent_idx" ON "casino_p_descriptions_games"("parent");

-- CreateIndex
CREATE INDEX "casino_p_software_link_casino_software_idx" ON "casino_p_software_link"("casino", "software");

-- CreateIndex
CREATE INDEX "casino_p_games_game_software_vercel_image_url_vercel_image__idx" ON "casino_p_games"("game_software", "vercel_image_url", "vercel_image_size");

-- CreateIndex
CREATE INDEX "casino_p_jurisdictions_casino_id_idx" ON "casino_p_jurisdictions"("casino_id");

-- CreateIndex
CREATE INDEX "casino_p_banks_vercel_image_url_vercel_image_size_vercel_la_idx" ON "casino_p_banks"("vercel_image_url", "vercel_image_size", "vercel_largeimage_url", "vercel_largeimage_size");

-- CreateIndex
CREATE INDEX "casino_p_bank_connect_parent_bank_idx" ON "casino_p_bank_connect"("parent", "bank");

-- CreateIndex
CREATE INDEX "casino_p_bonus_parent_freespins_nodeposit_deposit_deposit_a_idx" ON "casino_p_bonus"("parent", "freespins", "nodeposit", "deposit", "deposit_amount", "position", "active", "percent");

-- CreateIndex
CREATE INDEX "casino_p_slot_details_parent_idx" ON "casino_p_slot_details"("parent");

-- CreateIndex
CREATE INDEX "casino_p_restrictions_casino_country_allow_idx" ON "casino_p_restrictions"("casino", "country", "allow");

-- CreateIndex
CREATE INDEX "casino_p_games_pros_game_idx" ON "casino_p_games_pros"("game");

-- CreateIndex
CREATE INDEX "casino_p_games_cons_game_idx" ON "casino_p_games_cons"("game");

-- CreateIndex
CREATE INDEX "casino_p_games_faq_game_idx" ON "casino_p_games_faq"("game");

-- CreateIndex
CREATE INDEX "casino_p_casino_pros_casino_idx" ON "casino_p_casino_pros"("casino");

-- CreateIndex
CREATE INDEX "casino_p_casino_cons_casino_idx" ON "casino_p_casino_cons"("casino");

-- CreateIndex
CREATE INDEX "casino_p_casino_faq_casino_idx" ON "casino_p_casino_faq"("casino");

-- CreateIndex
CREATE INDEX "casino_p_subcontent_content_id_type_idx" ON "casino_p_subcontent"("content_id", "type");

-- AddForeignKey
ALTER TABLE "outbounding" ADD CONSTRAINT "outbounding_casinoId_fkey" FOREIGN KEY ("casinoId") REFERENCES "casino_p_casinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outbounding" ADD CONSTRAINT "outbounding_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_filter_condition" ADD CONSTRAINT "casino_filter_condition_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contactMessage" ADD CONSTRAINT "contactMessage_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoutMessage" ADD CONSTRAINT "shoutMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoutMessage" ADD CONSTRAINT "shoutMessage_parent_fkey" FOREIGN KEY ("parent") REFERENCES "shoutMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pbot" ADD CONSTRAINT "tb_pbot_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pbot" ADD CONSTRAINT "tb_pbot_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pbot_shout" ADD CONSTRAINT "tb_pbot_shout_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pbot_shout" ADD CONSTRAINT "tb_pbot_shout_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "shoutMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_casinoId_fkey" FOREIGN KEY ("casinoId") REFERENCES "casino_p_casinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_casinoId_fkey" FOREIGN KEY ("casinoId") REFERENCES "casino_p_casinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchCardGame" ADD CONSTRAINT "ScratchCardGame_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchCardAward" ADD CONSTRAINT "ScratchCardAward_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "ScratchCardGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchCardAward" ADD CONSTRAINT "ScratchCardAward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_meta_casinos" ADD CONSTRAINT "casino_p_meta_casinos_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_meta_games" ADD CONSTRAINT "casino_p_meta_games_s_id_fkey" FOREIGN KEY ("s_id") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_descriptions_casinos" ADD CONSTRAINT "description_casino_fk" FOREIGN KEY ("parent") REFERENCES "casino_p_casinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_descriptions_games" ADD CONSTRAINT "description_game_fk" FOREIGN KEY ("parent") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_software_link" ADD CONSTRAINT "casino_p_software_link_casino_fkey" FOREIGN KEY ("casino") REFERENCES "casino_p_casinos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_software_link" ADD CONSTRAINT "casino_p_software_link_software_fkey" FOREIGN KEY ("software") REFERENCES "casino_p_software"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_games" ADD CONSTRAINT "casino_p_games_game_software_fkey" FOREIGN KEY ("game_software") REFERENCES "casino_p_software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_jurisdictions" ADD CONSTRAINT "casino_p_jurisdictions_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "casino_p_casinos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_jurisdictions" ADD CONSTRAINT "casino_p_jurisdictions_jurisdiction_id_fkey" FOREIGN KEY ("jurisdiction_id") REFERENCES "casino_p_lcb_juristrictions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_bank_connect" ADD CONSTRAINT "casino_p_bank_connect_bank_fkey" FOREIGN KEY ("bank") REFERENCES "casino_p_banks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_bank_connect" ADD CONSTRAINT "casino_p_bank_connect_parent_fkey" FOREIGN KEY ("parent") REFERENCES "casino_p_casinos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_bonus" ADD CONSTRAINT "casino_p_bonus_parent_fkey" FOREIGN KEY ("parent") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_games_image" ADD CONSTRAINT "casino_p_games_image_game_image_parent_fkey" FOREIGN KEY ("game_image_parent") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_slot_details" ADD CONSTRAINT "casino_p_slot_details_parent_fkey" FOREIGN KEY ("parent") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_restrictions" ADD CONSTRAINT "casino_p_restrictions_casino_fkey" FOREIGN KEY ("casino") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_games_pros" ADD CONSTRAINT "casino_p_games_pros_game_fkey" FOREIGN KEY ("game") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_games_cons" ADD CONSTRAINT "casino_p_games_cons_game_fkey" FOREIGN KEY ("game") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_games_faq" ADD CONSTRAINT "casino_p_games_faq_game_fkey" FOREIGN KEY ("game") REFERENCES "casino_p_games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_casino_pros" ADD CONSTRAINT "casino_p_casino_pros_casino_fkey" FOREIGN KEY ("casino") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_casino_cons" ADD CONSTRAINT "casino_p_casino_cons_casino_fkey" FOREIGN KEY ("casino") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_casino_faq" ADD CONSTRAINT "casino_p_casino_faq_casino_fkey" FOREIGN KEY ("casino") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_subcontent" ADD CONSTRAINT "casino_p_subcontent_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "casino_p_software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_publish_articles" ADD CONSTRAINT "casino_p_publish_articles_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "casino_p_casinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casino_p_publish_articles" ADD CONSTRAINT "casino_p_publish_articles_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "casino_p_games"("game_id") ON DELETE SET NULL ON UPDATE CASCADE;
