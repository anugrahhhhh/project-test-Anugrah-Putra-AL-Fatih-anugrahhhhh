import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Pagination from './Pagination';
import './PostList.css';

const API_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

const getLocalState = (key, defaultVal) => {
  return JSON.parse(localStorage.getItem(key)) || defaultVal;
};

function PostList() {
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(getLocalState('perPage', 10));
  const [sort, setSort] = useState(getLocalState('sort', '-published_at'));
  const [currentPage, setCurrentPage] = useState(getLocalState('currentPage', 1));
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          'page[number]': currentPage,
          'page[size]': perPage,
          append: ['small_image', 'medium_image'],
          sort: sort,
        },
      });
      setPosts(response.data.data);
      setTotalItems(response.data.meta.total);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, perPage, sort]);

  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
    localStorage.setItem('perPage', JSON.stringify(perPage));
    localStorage.setItem('sort', JSON.stringify(sort));
  }, [currentPage, perPage, sort]);

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="fw-medium small">
          Showing {posts.length > 0 ? (currentPage - 1) * perPage + 1 : 0} –{' '}
          {(currentPage - 1) * perPage + posts.length} of {totalItems}
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end small-filters">
          <div className="d-flex align-items-center filter-group">
            <label className="filter-label me-2" htmlFor="perPageSelect">Show per page:</label>
            <div className="custom-select-wrapper">
              <select
                id="perPageSelect"
                className="form-select form-select-sm filter-select custom-select"
                value={perPage}
                onChange={handlePerPageChange}
              >
                {[10, 20, 50].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex align-items-center filter-group">
            <label className="filter-label me-2" htmlFor="sortSelect">Sort by:</label>
            <div className="custom-select-wrapper">
              <select
                id="sortSelect"
                className="form-select form-select-sm filter-select custom-select"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-sm-6 col-md-4 col-lg-3">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Pagination
          totalItems={totalItems}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PostList;
