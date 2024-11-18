**Game Library App**

This is a [Next.js](https://nextjs.org) project bootstrapped with [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Features**

-  Search, sort, and filter games in the library.

-  Backend powered by [Weaviate](https://weaviate.io), with data from a Kaggle dataset (dummy link for now).

-  Easy setup and testing instructions provided below.


**Getting Started**

**Prerequisites**

-  **Python**: Ensure Python is installed on your machine.

-  **Node.js**: Install [Node.js](https://nodejs.org/) (v16 or above recommended).

-  **npm or yarn**: Package manager for managing dependencies.



**Setup**

**1\. Python Virtual Environment**

1.  Create a virtual environment:


```bash
python -m venv weaviate_env
```

2.  Activate the virtual environment:

-  On Windows:

```bash
weaviate_env\Scripts\activate
```

-  On macOS/Linux:

```bash
source weaviate_env/bin/activate
```

3.  Install the Python dependencies:
```bash
pip install -r requirements.txt
```
**2\. Set Up Weaviate**

1.  Run the weaviate.ipynb Jupyter notebook to set up the schema and add data to your Weaviate cloud instance.

2.  Data is sourced from a Kaggle dataset. The .json file with the data is located in the root directory of this project.

- Dataset Link : [Kaggle](https://www.kaggle.com/datasets/jahnavipaliwal/video-game-reviews-and-ratings/data)

**3\. Install Node.js Dependencies**

1.  Run the following command to install the required npm packages:
```bash
npm install
```
**4\. Run the Development Server**

1.  Start the development server:
```bash
npm run dev
```
2.  Open your browser and navigate to <http://localhost:3000>.

**Testing the Application**

**Routes**

1.  /: Home page of the application.

2.  /GameLibrary: Access the game library. You can:

-  Search for games by title.

-  Sort games by different attributes (e.g., rating, price, etc.).

-  Apply filters for a more customized view.

