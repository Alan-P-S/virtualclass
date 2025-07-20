
export const isInBetween = (startTime,endTime,currentTime)=>{
    const now = currentTime;

    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();


    const [startHours,startMinutes,startSeconds] = startTime.split(':').map(Number);
    const [endHours, endMinutes,endSeconds] = endTime.split(':').map(Number);

    const startDate = new Date(now.getFullYear(),now.getMonth(),now.getDate(),startHours,startMinutes,startSeconds);
    const endDate = new Date(now.getFullYear(),now.getMonth(),now.getDate(),endHours,endMinutes,endSeconds);


    if(endDate<startDate){

        return now>=startDate || now < endDate;
    }
    else{

        return now>=startDate && now< endDate;
    }
}