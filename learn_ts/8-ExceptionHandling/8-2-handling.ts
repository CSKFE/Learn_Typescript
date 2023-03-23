{class NetworkClient {
  tryConnect():void {
    throw new OffLineError('Network Error');
  }
}

class UserService {
  // 디펜던시 인젝션
  constructor(private client: NetworkClient) {}
  login() {
    this.client.tryConnect();
    // login logic
  }
}

class App {
  constructor(private service: UserService){}
  run() {
    try {
      this.service.login();
    } catch(error) {
      console.log(error);
    }
  }
}

const client = new NetworkClient();
const service = new UserService(client);
const app = new App(service);
app.run();}

/**
 * 에러처리를 가장 우아하게(?) 처리할 수 있는곳에서 처리하는게 좋다.
 * 애매하게 하는건 좋지않다.
 */