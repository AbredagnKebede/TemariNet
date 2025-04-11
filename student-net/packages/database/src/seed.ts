import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing records
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.file.deleteMany();
  await prisma.post.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  // Create universities
  const universities = [
    'MIT',
    'Stanford University',
    'Harvard University',
    'University of Oxford',
    'University of Cambridge',
  ];

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Business Administration',
    'Economics',
    'Psychology',
    'Engineering',
  ];

  // Create sample users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const university = universities[Math.floor(Math.random() * universities.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.edu`,
        name: `User ${i}`,
        bio: `I'm a student at ${university} studying ${department}.`,
        year: Math.floor(Math.random() * 4) + 1,
        university,
        department,
        skills: department === 'Computer Science' 
          ? ['JavaScript', 'Python', 'React'] 
          : department === 'Engineering' 
            ? ['CAD', 'Matlab', 'Project Management'] 
            : ['Research', 'Analysis', 'Writing'],
        isApproved: true,
      },
    });
    users.push(user);
  }

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@studentnet.edu',
      name: 'Admin User',
      bio: 'I am the administrator of StudentNet.',
      isApproved: true,
      role: 'ADMIN',
    },
  });

  // Create groups
  const groups = [];
  for (let i = 1; i <= 5; i++) {
    const group = await prisma.group.create({
      data: {
        name: `Group ${i}`,
        description: `This is a group for students interested in topic ${i}.`,
        type: i % 3 === 0 ? 'PRIVATE' : 'PUBLIC',
        category: departments[Math.floor(Math.random() * departments.length)],
      },
    });
    groups.push(group);
  }

  // Add users to groups
  for (const user of users) {
    for (const group of groups) {
      if (Math.random() > 0.5) {
        await prisma.groupMember.create({
          data: {
            userId: user.id,
            groupId: group.id,
            role: Math.random() > 0.8 ? 'ADMIN' : Math.random() > 0.7 ? 'MODERATOR' : 'MEMBER',
          },
        });
      }
    }
  }

  // Create posts
  const posts = [];
  for (let i = 1; i <= 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const group = Math.random() > 0.6 ? groups[Math.floor(Math.random() * groups.length)] : null;
    
    const post = await prisma.post.create({
      data: {
        title: `Post ${i} Title`,
        content: `This is the content of post ${i}. It contains some text that would be useful for students.`,
        visibility: ['PUBLIC', 'UNIVERSITY', 'DEPARTMENT', 'PRIVATE'][Math.floor(Math.random() * 4)],
        authorId: user.id,
        groupId: group?.id,
      },
    });
    posts.push(post);
  }

  // Create comments
  for (const post of posts) {
    const commentCount = Math.floor(Math.random() * 5);
    for (let i = 0; i < commentCount; i++) {
      const commenter = users[Math.floor(Math.random() * users.length)];
      
      await prisma.comment.create({
        data: {
          content: `This is a comment on the post. Comment number ${i + 1}.`,
          authorId: commenter.id,
          postId: post.id,
        },
      });
    }
  }

  // Create connections
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      if (Math.random() > 0.7) {
        await prisma.connection.create({
          data: {
            senderId: users[i].id,
            receiverId: users[j].id,
            status: Math.random() > 0.3 ? 'ACCEPTED' : 'PENDING',
          },
        });
      }
    }
  }

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });