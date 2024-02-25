let chosenArticleId = null;

        function showArticles() {
            fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(response => response.json())
            .then(data => {
                const contentList = document.getElementById('content-list');
                contentList.innerHTML = ''; // Clear previous content
                data.slice(0, 5).forEach(itemId => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
                    .then(response => response.json())
                    .then(item => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = item.url;
                        a.textContent = item.title;
                        a.onclick = function() {
                            chosenArticleId = item.id; // Store the chosen article ID
                            document.getElementById('content-frame').src = this.href;
                            return false;
                        };
                        li.appendChild(a);
                        contentList.appendChild(li);
                    });
                });
            });
        }

        function showComments() {
            if (!chosenArticleId) {
                alert('Please select an article first.');
                return;
            }

            fetch(`https://hacker-news.firebaseio.com/v0/item/${chosenArticleId}.json`)
            .then(response => response.json())
            .then(article => {
                if (!article.kids) {
                    alert('No comments available for this article.');
                    return;
                }

                const contentList = document.getElementById('content-list');
                contentList.innerHTML = ''; // Clear previous content

                article.kids.slice(0, 5).forEach(commentId => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
                    .then(response => response.json())
                    .then(comment => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = `https://news.ycombinator.com/item?id=${comment.id}`;
                        a.textContent = comment.text;
                        a.target = '_blank'; // Open comments in a new tab
                        li.appendChild(a);
                        contentList.appendChild(li);
                    });
                });
            });
        }