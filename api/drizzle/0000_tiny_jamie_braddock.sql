CREATE TABLE "clubs" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clubs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "books_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"author" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "club_books" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "club_books_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"club_id" bigint NOT NULL,
	"book_id" bigint NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "club_books" ADD CONSTRAINT "club_books_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "club_books" ADD CONSTRAINT "club_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;