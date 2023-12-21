export const StopWorkTime = (timeInMillis) => {
    const hours = Math.floor(timeInMillis / 3600000);
    const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    const formattedTime = `${hours}시간 ${minutes < 10 ? '0' : ''}${minutes}분 ${
      seconds < 10 ? '0' : ''
    }${seconds}초`;
    //const formattedTime = `${hours}시간 ${minutes < 10 ? '0' : ''}${minutes}분`;
    return formattedTime;
  };