import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { request } from '../../utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    request(
      `/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { lastPage, posts } }) => {
      setPosts(posts);
      setLastPage(lastPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search searchPhrase={searchPhrase} onSearch={onSearch} />
        {posts.length ? (
          <div className="post-list">
            {posts.map(({ id, imageUrl, title, publishedAt, comments }) => (
              <PostCard
                key={id}
                id={id}
                imageUrl={imageUrl}
                title={title}
                publishedAt={publishedAt}
                commentsCount={comments.length}
              />
            ))}
          </div>
        ) : (
          <div className="no-posts-found">Статьи не найдены</div>
        )}
      </div>
      {lastPage > 1 && posts.length > 0 && (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  & .no-posts-found {
    text-align: center;
    font-size: 18px;
    margin-top: 40px;
  }
`;
