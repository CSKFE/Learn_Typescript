{
  // Union Types: OR

  type Direction = 'left' | 'right' | 'top' | 'bottom';
  function move(direction: Direction) {
    console.log(direction);
  }

  // 함수호출 인자를 전달할때 위에 정의된 타입을 미리 알려준다
  move('left');

  type TileSize = 8 | 16 | 32;
  // 발생할수있는 타입중 하나만 가능할때 사용한다
  // 다른값을 할당하려하면 에러
  // const tile:TileSize = 3;

  type SuccessState = {
    response: {
      body: string;
    }
  };

  type FaliState = {
    response: {
      body: string;
    }
  };

  type LoginStates = SuccessState | FaliState;

  // 유니온은 발생할 수 있는 다양한 케이스들 중 하나만 특정하고싶을때 사용된다.
  function login(id: string, pw: string): LoginStates {
    return {
      response: {
        body: 'logined',
      }
    };
  }

  type LoginState = LoginSuccess | LoginFail;
  type LoginSuccess = {
    response: {
      body: 'good'
    }
  };
  type LoginFail = {
    reason: 'oh...fail'
  }

  const printLoginState = (state: LoginState):void => {
    // in 연산자를 사용해서 state에 response가 정의됐는지 체크 후 결과값 리턴
    if('response' in state) {
      console.log(state.response.body)
    } else {
      console.log(state.reason)
    }
  }  
}