const targetDate = "2022-09-27T19:12:13";

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment-display");

  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment-display_top"
  );

  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment-display_bottom"
  );

  const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");

  const segmentOverlayTop = segmentDisplay.querySelector(
    ".segment-overlay_top"
  );

  const segmentOverlayBottom = segmentDisplay.querySelector(
    ".segment-overlay_bottom"
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}
function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);
  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentDisplayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');

    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentDisplayTop,
      timeValue
    );
    this.removeEventListener("animationend", finishAnimation);
  }
  segmentElements.segmentOverlay.addEventListener("animationend");
}
function updateTimeSection(sectionID,timeValue){
    const firstNumber=Math.floor(timeValue/10);
    const secondNumber=timeValue%10;

    const sectionElement=document.getElementById(sectionID);
    const timeSegments=
     sectionElement.querySelectorAll('.time-segment')

     updateTimeSegment(timeSegments[0],firstNumber)
     updateTimeSegment(timeSegments[1],secondNumber)

}
function getTimeRemaining(targetDateTime)
{
    const nowTime=Date.now()
    const secondsRemaining=Math.floor(targetDateTime-nowTime)/1000

    const complete =nowTime =>targetDateTime;
    if(complete){
        return{
            complete,
             seconds:0,
            minutes:0,
            hours:0,
        };
    }
      
    const hours=Math.floor(secondsRemaining / 60 / 60)
    const minutes=Math.floor(secondsRemaining / 60 )-hours * 60
    const seconds=(secondsRemaining % 60)

    return{
        complete,
        seconds,
        minutes,
        hours
    };
}

    function updateAllSegments()
    {
        const targetTimeStamp = new Date(targetDate.getTime());
        const getTimeRemainingBits = getTimeRemaining(targetTimeStamp)

        updateTimeSection('seconds',getTimeRemainingBits.seconds)
        updateTimeSection('minutes',getTimeRemainingBits.minutes)
        updateTimeSection('hours',getTimeRemainingBits.hours)
        
        return getTimeRemainingBits.complete

    }
    const countDownTImer =setInterval(()=>{
       const isComplete= updateAllSegments();
       if(isComplete){
        clearInterval(countDownTImer);
       }
    },1000);


  updateAllSegments()