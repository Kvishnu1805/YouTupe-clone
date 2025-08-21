export const API_KEY = 'AIzaSyAPSX6sHUVi_M18B9_qG_fJESSGvP3Gpa8';

export const value_counter = (value) => {
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if (value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
}