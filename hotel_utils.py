import pickle
import pandas as pd

def findMyHotel(dataframe, country, tags, sortBy, stars):
    
    #country mask
    countryMask=dataframe['countries'].str.contains(country, case=False)


    #tag masks
    tagMasks=[dataframe['Tags'].str.contains(eachTag, case=False) for eachTag in tags]
    combinedMask=pd.Series([True]*len(dataframe))
    #combining tag masks
    for eachMask in tagMasks:
        combinedMask &= eachMask
    

    #star filtering
    starMask=pd.Series([True]*len(dataframe))
    if stars!=0 :
        if stars==3 :
            starMask=dataframe['Stars']==3
        elif stars==4 :
            starMask=dataframe['Stars']==4
        elif stars==5 :
            starMask=dataframe['Stars']==5
    

    #final df
    result_df=dataframe[combinedMask & countryMask & starMask]


    #sorting data based on filter
    if sortBy==0:       #average score sorting
        result_df=result_df.sort_values('Average_Score',ascending=False)
    elif sortBy==1:     #word score sorting
        result_df=result_df.sort_values('Word_Score',ascending=False)
    else :
        print("wrong filter")
        return
    
    
    #trimming and printing the result
    result_df.drop_duplicates(['Hotel_Name','Average_Score','Stars'],inplace=True)
    result_df=result_df.head(10)
    print(result_df[['countries','Hotel_Name','Average_Score','Word_Score','Stars']])


def methods():
    print("Dataframe : df")
    print("Find hotel function : findMyHotel(dataframe, country{String}, tags{String array}, sortBy{int}, stars{int})")


if __name__=="__main__":
    with open("hotelModelPickle.pkl","rb") as f:
        hotelModel=pickle.load(f)
    #findMyHotel(hotelModel,"AT",["couple","leisure trip"],0,5)
    methods()
    