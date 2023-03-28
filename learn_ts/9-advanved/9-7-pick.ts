{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  }

  // Pick 유틸리티 타입을 이용하면 기존의 타입에서 내가 원하는 타입만 골라서 사용할 수 있다.
  type VideoMetaData = Pick<Video, 'id' | 'title'>;

  function getVideo(id: string): Video {
    return {
      id: 'ddd',
      title: 'ddddd',
      url: 'https://ddddd.ddd.dd',
      data: 'data.tata'
    }
  }
  // Pick 유틸리티 타입을 이용하면 
  function getVideoData(id: string): VideoMetaData {
    return {
      id: 'id.ddd',
      title: 'tatata',
    }
  }
}