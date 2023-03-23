{
  type SuccessState = {
    result: 'success';
  }

  type FailState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
  }

  type ResultState = SuccessState | FailState;

  class NetworkClient {
    tryConnect():ResultState {
      
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
  app.run();
}