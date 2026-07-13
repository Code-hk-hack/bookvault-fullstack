import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleBooks = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
    rating: 4.8,
    lore: 'Set on the desert planet Arrakis, Dune is the story of Paul Atreides, who moves to the dangerous planet to ensure the future of his family and his people.',
  },
  {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop',
    rating: 4.7,
    lore: 'The tale of Kvothe, an academically gifted young man who grows to become the most notorious wizard his world has ever seen.',
  },
  {
    title: 'Neuromancer',
    author: 'William Gibson',
    genre: 'Cyberpunk',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
    rating: 4.5,
    lore: 'Case was the hottest computer-cowboy cruising the information superhighway until he crossed the wrong people.',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop',
    rating: 4.9,
    lore: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling further than the pantry until the wizard Gandalf arrives.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop',
    rating: 4.6,
    lore: 'Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother.',
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing books to prevent duplicate clutter during testing
  await prisma.book.deleteMany();

  for (const book of sampleBooks) {
    const createdBook = await prisma.book.create({
      data: book,
    });
    console.log(`✅ Seeded book: ${createdBook.title}`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });