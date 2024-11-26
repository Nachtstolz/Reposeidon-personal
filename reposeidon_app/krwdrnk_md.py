import pandas as pd
import numpy as np
from krwordrank.hangle import normalize
from krwordrank.word import KRWordRank
from sklearn.feature_extraction.text import CountVectorizer
from krwordrank.sentence import summarize_with_sentences
import konlpy
import pickle
import sys

def krwdrnk(data) :
    li = data.split('.')
    for i in range(len(li)) :
        li[i] = li[i].strip()
        
    okt = konlpy.tag.Okt()
    for i, doc in enumerate(li) :
        okt = konlpy.tag.Okt()
        clean_words = []
        for word in okt.pos(doc, stem=True) :
            # 조사, 기호, 부사, 외국어, 접속사, ㅋㅋ,ㅎㅎ 등, 어미 제외
            if word[1] not in ['Josa', 'Emoi', 'Punctuation', 'Adverb', 'Foreign', 'Conjunction', 'Determiner'] :
                if word[1]:
                    clean_words.append(word[0])
        doc = ' '.join(clean_words)
        li[i] = doc
        
    # normalize : 불필요한 특수기호 제거하는 전처리 함수
    # 한글, 영어 숫자 제외 다른 글자 제거
    text = [normalize(tx, english=True, number=True) for tx in li]
    
    min_count = 2 #임의 설정 #단어의 최소 출현 빈도 수
    max_length = 10 #단어의 최대 길이
    wdrnk = KRWordRank(min_count=min_count, max_length=max_length, verbose=True)
    
    beta = 0.85 # PageRank의 decaying factor beta (등식의 균형을 위해 필요한 소멸계수)
    max_iter = 10

    # keywords = filtering이 적용된 L parts
    # rank = substring graph의 모든 substring에 대한 rank
    # graph = substring graph
    keywords, rank, graph = wdrnk.extract(text, beta, max_iter)
    
    sorted(keywords.items(), key=lambda x:x[1], reverse=True)
    
    #설정하고 싶은 stopwords가 있다면 선정
    stopwords = {'이', '그', '저', '이것', '저것', '그것', '있다', '됐다', 
                 '되다', '한다', '하다', '이는', '이다', '돼다'} # 임의 선정 완료
    
    passwords = {word:score for word, score in sorted(keywords.items(), key=lambda x:-x[1])[:10] if not (word in stopwords)}
    
    result = []
    for key in passwords :
        result.append(key)
        
    return result