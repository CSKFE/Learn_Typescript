{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  }

  // Omit은 Pick과 반대로 원하지 않는 키 값을 제외한다
  // 제네릭으로 받은 타입에 없는 키도 전달이 가능하다.
  // 그러므로 만약 없는 키가 들어와도 제거할 수 있게된다.
  type VideoMetaData = Omit<Video, 'url' | 'data' | 'what?'>;

  function getVideo(id: string): Video {
    return {
      id: 'ddd',
      title: 'ddddd',
      url: 'https://ddddd.ddd.dd',
      data: 'data.tata'
    }
  }
  function getVideoData(id: string): VideoMetaData {
    return {
      id: 'id.ddd',
      title: 'tatata',
    }
  }
}