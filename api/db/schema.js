const { pgTable, bigint, text, timestamp, pgEnum } = require('drizzle-orm/pg-core');

// Cada pgTable é um objeto javaScript que representa uma tabela 
const clubs = pgTable('clubs', {
  id: bigint('id', { mode: 'number' }).generatedAlwaysAsIdentity().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const books = pgTable ( 'books', {
    id: bigint('id', { mode: 'number'}).generatedAlwaysAsIdentity().primaryKey(),
    title: text('title').notNull(), 
    author: text('author').notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
}
);

const statusEnum = pgEnum('status', ['current', 'upcoming', 'past']);
const clubBooks = pgTable('club_books', {
     id: bigint('id', { mode: 'number' }).generatedAlwaysAsIdentity().primaryKey(),
    clubId: bigint('club_id', { mode: 'number' })
    .notNull()
    .references(() => clubs.id, {onDelete:'cascade'}),
    bookId:bigint('book_id', {mode: 'number'})
    .notNull()
    .references(() => books.id, {onDelete:'cascade'}),
    status: statusEnum('status').notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
}
);

module.exports = { clubs, books, clubBooks, statusEnum };