{
  // 앞의 Union을 리팩토링할거다.{
  type SuccessState = {
    result: 'SUCCESS'; // 각각 유니온 안에 result라는 키를 넣어준다.
    response: {
      body: string;
    }
  };

  type FaliState = {
    result: 'FAIL'; // 각각 유니온 안에 result라는 키를 넣어준다.
    reason: string;
  };

  // 각각의 유니온에 result라는 키를 넣어줌으로, 타입이 보장되면서 각각 다른 값을 가질 수 있게됐다.
  type LoginStates = SuccessState | FaliState;

  // 유니온은 발생할 수 있는 다양한 케이스들 중 하나만 특정하고싶을때 사용된다.
  function login(id: string, pw: string): LoginStates {
    return {
      result: 'SUCCESS',
      response: {
        body: 'logined',
      }
    };
  }

  type LoginState = LoginSuccess | LoginFail;
  type LoginSuccess = {
    result: 'SUCCESS';
    response: {
      body: 'good'
    }
  };
  type LoginFail = {
    result: 'FAIL';
    reason: 'oh...fail'
  }

  const printLoginState = (state: LoginState):void => {
    //state.result = success or fail value
    if(state.result === 'SUCCESS') {
      console.log(state.response.body)
    } else {
      console.log(state.reason)
    }
  }  
  // 각각의 유니온에 공통적인 키를 갖게되므로써 더 직관적인 코드를 작성할 수 있다.
  // 이전 유니온.ts 페이지에서 in 연산자를 활용한것보다 훨씬 더 직관적이다.
}