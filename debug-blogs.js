const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBlogs() {
  try {
    console.log('Checking blogs in database...');
    
    const allBlogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    
    console.log(`Total blogs found: ${allBlogs.length}`);
    
    if (allBlogs.length > 0) {
      console.log('\nBlogs:');
      allBlogs.forEach((blog, index) => {
        console.log(`${index + 1}. "${blog.title}" by ${blog.author.name}`);
        console.log(`   - Published: ${blog.published}`);
        console.log(`   - Slug: ${blog.slug}`);
        console.log(`   - Created: ${blog.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No blogs found in database.');
    }
    
    const publishedBlogs = await prisma.blog.findMany({
      where: { published: true },
    });
    
    console.log(`Published blogs: ${publishedBlogs.length}`);
    
  } catch (error) {
    console.error('Error checking blogs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogs();