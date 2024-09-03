import pandas as pd

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity



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
    filterDf=filterDf.sort_values(['Average_Score','Hotel_Name'],ascending=[False,True]).drop_duplicates(['Hotel_Name'],keep='first')

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
    print(resultDf[['Hotel_Name','Average_Score','Reviewer_Score','Stars','Price']])
    return resultDf



def hotelCountry(df,country):

    countryMask=df['countries'].str.contains(country,case=False)

    filterDf=df[countryMask]
    filterDf=filterDf.sort_values(['Average_Score','Hotel_Name'],ascending=[False,True]).drop_duplicates(['Hotel_Name'],keep='first')
    filterDf=filterDf.head(15)
    return filterDf



def methods():
    return ("Find hotel function : findMyHotel(dataframe, country(string), tags(string array), sortBy(int), stars(int))")