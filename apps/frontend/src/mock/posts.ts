// mock/posts.ts
import { faker } from '@faker-js/faker';

export function generateFakePosts(count = 10) {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    image: faker.image.urlPicsumPhotos({ width: 800, height: 400, blur: 0 }),
    category: faker.hacker.noun(),
    author: faker.person.fullName(),
    avatar: faker.image.avatar(),
    createdAt: faker.date.recent().toLocaleDateString(),
  }));
}
