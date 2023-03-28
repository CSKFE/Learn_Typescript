{
  type PageInfo = {
    title: string;
  };

  type Page = 'home' | 'about' | 'contact';
  

  // Record는 두개의 타입을 이어준다.
  // 아래의 예시는 Page와 PageInfo 를 Record로 묶었다
  // 이때 Page는 key가 되고, PageInfo는 Key의 value가 됐다.
  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  }

  type Animals = 'cat' | 'dog';
  type NewAnimals = Capitalize<Animals>; // 'Cat' | 'Dog';
}