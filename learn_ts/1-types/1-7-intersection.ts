{
  // 유니온은 발생하는 경우의 수 중 한가지를 선택했다 (or(||) 과 같은 맥락이다)
  // 인터섹션은 and(&&) 와 같은 맥락이다.

  type Student = {
    name: string;
    score: number;
  }

  type Worker = {
    job: string;
    work: () => void;
  }

  function internWorker(person: Student & Worker) {
    console.log(`name - ${person.name} score - ${person.score} job ${person.job}`);
  }

  internWorker({
    name: 'choi',
    score: 123123,
    job: 'SW',
    work() {}
  })

  // internWorker 함수의 인자 person은 Student 와 Worker 의 타입을 다 갖고있어야한다.
  // 이때 & 를 이용해 인터섹션 타입으로 정의해서 두가지 타입을 모두 만족하는 인자를 전달해야한다.

  // 이런식으로 둘의 타입 중 하나의 타입이라도 전달되지않으면 에러가 발생한다.
  internWorker({
    name: 'choi',
    job: 'SW',
    work() {}
  })

}