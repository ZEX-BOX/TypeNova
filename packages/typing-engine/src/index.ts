export interface LiveMetrics { wpm:number; cpm:number; accuracy:number; correctCharacters:number; errors:number; elapsedSeconds:number; }
/** Prefix-based live metrics. WPM = correct characters / 5 / elapsed minutes. Accuracy = matching typed positions / typed positions. Corrections are not yet modelled as individual key attempts. */
export function calculateLiveMetrics(target:string,typed:string,elapsedSeconds:number):LiveMetrics {
 const elapsed=Number.isFinite(elapsedSeconds)?Math.max(0,elapsedSeconds):0;const sample=typed.slice(0,target.length);let correct=0;
 for(let i=0;i<sample.length;i+=1)if(sample[i]===target[i])correct+=1;
 const errors=sample.length-correct;const accuracy=sample.length===0?100:correct/sample.length*100;const minutes=elapsed/60;
 return {wpm:round(minutes>0?correct/5/minutes:0),cpm:round(minutes>0?correct/minutes:0),accuracy:round(accuracy),correctCharacters:correct,errors,elapsedSeconds:round(elapsed)};
}
function round(value:number){return Math.round(value*10)/10;}
