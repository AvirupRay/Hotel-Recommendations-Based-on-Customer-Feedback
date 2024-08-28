import pandas as pd

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def findMyHotel(dataframe, country, tags, sortBy, stars, range):
    
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

    
    #price filtering
    min=range[0]
    max=range[1]
    minPriceMask=dataframe['Price']>=min
    maxPriceMask=dataframe['Price']<=max
    combinedPriceMask=minPriceMask & maxPriceMask
    

    #final df
    result_df=dataframe[combinedMask & countryMask & starMask & combinedPriceMask]


    #sorting data based on filter
    if sortBy==0:       #average score sorting
        result_df=result_df.sort_values('Average_Score',ascending=False)
    elif sortBy==1:     #word score sorting
        result_df=result_df.sort_values('Word_Score',ascending=False)
    elif sortBy==2:     #price sorting
        result_df=result_df.sort_values('Price',ascending=True)
    else :
        print("wrong filter")
        return
    
    
    #trimming and printing the result
    result_df.drop_duplicates(['Hotel_Name'],inplace=True)
    result_df=result_df.head(10)
    print(result_df[['countries','Hotel_Name','Average_Score','Word_Score','Stars','Price']])
    return result_df[['countries','Hotel_Name','Average_Score','Word_Score','Stars','Price']]



def findMyHotel3(dataframe,country,sortBy,stars,range,query):

    #country mask
    countryMask=dataframe['countries'].str.contains(country,case=False)

    #star filtering
    starMask=pd.Series([True]*len(dataframe))
    if stars!=0 :
        if stars==3 :
            starMask=dataframe['Stars']==3
        elif stars==4 :
            starMask=dataframe['Stars']==4
        elif stars==5 :
            starMask=dataframe['Stars']==5

    #price filtering
    min=range[0]
    max=range[1]
    minPriceMask=dataframe['Price']>=min
    maxPriceMask=dataframe['Price']<=max
    combinedPriceMask=minPriceMask & maxPriceMask

    #filtered df
    filterDf=dataframe[countryMask & starMask & combinedPriceMask]
    filterDf.drop_duplicates(['Hotel_Name'],inplace=True)
    
    
    tfidf=TfidfVectorizer(stop_words="english")                 #making tf idf vectorizer
    tfMatrix=tfidf.fit_transform(filterDf['Tags'])              #convert tags to vectors
    queryVector=tfidf.transform([query.lower()])                #making the queryVector
    cosProd=cosine_similarity(queryVector,tfMatrix).flatten()   #cos product of query and tags
    hotelsFound = cosProd.argsort()[-100:][::-1]                #getting indices of hotels found
    result_df=filterDf.iloc[hotelsFound]                        #filtering dataframe based on indices from cos product

    if sortBy==0:                                                           #average score sorting
        result_df=result_df.sort_values('Average_Score',ascending=False)
    elif sortBy==1:                                                         #word score sorting
        result_df=result_df.sort_values('Word_Score',ascending=False)
    elif sortBy==2:                                                         #price sorting
        result_df=result_df.sort_values('Price',ascending=True)
    else :
        print("wrong filter")
        return
    
    
    result_df=result_df.head(10)
    print(result_df[["Hotel_Name","Tags","Average_Score","Word_Score","Stars","Price"]])
    return result_df


def findMyHotel4(df, country, sortBy, stars, range, query):

    #country
    countryMask=df["countries"].str.contains(country,case=False)

    #stars
    starMask=pd.Series([True]*len(df))
    if stars!=0:
        if stars==3:
            starMask=df['Stars']==3
        elif stars==4:
            starMask=df['Stars']==4
        elif stars==5:
            starMask=df['Stars']==5

    
    #price
    min=range[0]
    max=range[1]
    minPriceMask=df['Price']>=min
    maxPriceMask=df['Price']<=max
    combinedPriceMask=minPriceMask & maxPriceMask

    #filter
    filterDf=df[countryMask & starMask & combinedPriceMask]
    filterDf=filterDf.drop_duplicates(['Hotel_Name'])

    #process text
    def processText(text):
        stopWords=set(stopwords.words("english"))
        words=word_tokenize(text)
        filterWords=[i for i in words if i not in stopWords]
        lemmat=WordNetLemmatizer()
        lemmatWords=[lemmat.lemmatize(i) for i in filterWords]
        return " ".join(lemmatWords)
    
    #processing the query
    queryText=processText(query)
    print(queryText)

    #creating the vectors and finding cos product
    tfidf=TfidfVectorizer(stop_words="english")
    tfMatrix=tfidf.fit_transform(filterDf['Words'])
    queryVector=tfidf.transform([queryText.lower()])
    cosProd=cosine_similarity(queryVector,tfMatrix).flatten()
    hotelsFound=cosProd.argsort()[-100:][::-1]
    resultDf=filterDf.iloc[hotelsFound]

    if sortBy==0:
        resultDf=resultDf.sort_values('Average_Score',ascending=False)
    elif sortBy==1:
        resultDf=resultDf.sort_values('Reviewer_Score',ascending=False)
    elif sortBy==2:
        resultDf=resultDf.sort_values('Price',ascending=True)
    else:
        print("Wrong filter")
        return
    
    resultDf=resultDf.head(5)
    print(resultDf[['Hotel_Name','Average_Score','Reviewer_Score','countries','Stars','Price']])
    return resultDf


def methods():
    return ("Find hotel function : findMyHotel(dataframe, country(string), tags(string array), sortBy(int), stars(int))")