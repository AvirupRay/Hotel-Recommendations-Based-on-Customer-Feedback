# Hotel Recommendation System Based on Customer Feedback using NLP

This project is a **hotel recommendation system** that leverages **Natural Language Processing (NLP)** to analyze customer feedback and suggest hotels based on user preferences. The system processes customer reviews, extracts relevant tags and features, and recommends hotels using **TF-IDF vectorization**, **lemmatization**, and **cosine similarity**.

## Features
- Analyzes customer reviews to extract meaningful information (e.g., "double bedroom," "swimming pool").
- Allows users to:
  - Select a country.
  - Set a price range.
  - Input desired hotel features.
- Recommends hotels based on:
  - Similarity to user queries.
  - Customer feedback.
  - Sorting preferences (e.g., price, star rating, hotel score).
- Achieved Accuracy of **95.00**, Precision of **92.29**, Recall of **90.00**, and F1 score of **89.69**.

## Technologies Used
- **Programming Language**: Python
- **Frameworks**: Flask (Backend), Jupyter Notebook (Development)
- **NLP Libraries**: NLTK
- **Machine Learning Libraries**: scikit-learn (TF-IDF, cosine similarity)
- **Dataset**: [Kaggle - 515,000 customer reviews of 1,493 luxury hotels in Europe](https://www.kaggle.com).

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hotel-recommendation-system.git
   cd hotel-recommendation-system
2. Install frontend dependencies:
   ```bash
   cd client_side
   npm i
3. Run frontend
   ```bash
   npm run dev
4. Goto backend
   ```bash
   cd hotel-recommendation-system
   cd server_side
5. Create Python Venv
   ```bash
   python -m venv hotelsEnv
6. Activate Environment
   ```bash
   hotelsEnv\Scripts\Activate
7. Install dependencies
   ```bash
   pip install -r reqs.txt
8. Run backend
   ```bash
   python app.py
