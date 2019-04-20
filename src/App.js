import React, { Component } from 'react';
import response0 from './response-0';
import response1 from './response-1';
import response2 from './response-2';

import './App.css';
import './loader.css';

const getUrl = id => `https://media2.giphy.com/media/${id}/200w.gif`;

const mockResponses = [response0, response1, response2];

const testing = false;

class App extends Component {
  state = {
    data: [],
    gifs: [],
    offset: 0,
    page: 0,
    loading: null,
  };

  loadData = offset => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return fetch(`${apiUrl}?offset=${offset}`)
      .then(response => response.json())
      .then(gifObject => this.onSetData(gifObject))
      .catch(error => console.log(error));
  };

  mockLoadData = index => {
    const { page } = this.state;
    const computedIndex = index || page;
    const mockResponse = mockResponses[computedIndex];

    return Promise.resolve(mockResponse)
      .then(gifObject => this.onSetData(gifObject))
      .catch(error => console.log(error));
  };

  onSetData = gifObject => {
    const { data } = gifObject;
    const newGifs = data.map(datum => {
      const { id, title } = datum;
      const { width, height } = datum.images.fixed_width;
      return { id, title, width, height };
    });

    const { gifs } = this.state;
    this.setState({
      gifs: [...gifs, ...newGifs],
      loading: false,
    });
  };

  mockfetchNextPage = () => {
    const { page } = this.state;
    if (page >= 3) {
      return;
    }

    this.mockLoadData(page);

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchNextPage = () => {
    if (testing) {
      this.mockfetchNextPage();
      return;
    }

    const { offset } = this.state;
    this.loadData(offset);
    this.setState(prevState => ({
      offset: prevState.offset + 25,
    }));
  };

  onScroll = () => {
    this.handleLazyLoading();
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.body;

    const reachedBottom = innerHeight + scrollY >= offsetHeight;
    if (reachedBottom) {
      this.setState({ loading: true });
      this.fetchNextPage();
    }
  };

  handleLazyLoading = () => {
    let lazyloadThrottleTimeout;

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(() => {
        const { pageYOffset: scrollTop, innerHeight } = window;
        const lazyloadImages = document.querySelectorAll('.lazy');

        lazyloadImages.forEach(img => {
          const imageInViewport = img.offsetTop < innerHeight + scrollTop;
          if (imageInViewport) {
            img.src = img.dataset.src;
            img.style.height = '100%';
            img.classList.remove('lazy');
          }
        });

        if (lazyloadImages.length === 0) {
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        }
      }, 0);
    }

    document.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);
  };

  componentDidMount() {
    this.fetchNextPage();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { gifs, loading } = this.state;
    return (
      <div className="App">
        <div className="image-grid">
          {gifs.map((gif, index) =>
            index < 15 ? (
              <div className="image-item" key={gif.id}>
                <img
                  className="image"
                  alt={gif.title}
                  width={gif.width}
                  height={gif.height}
                  src={getUrl(gif.id)}
                />
              </div>
            ) : (
              <div className="image-item lazy" key={gif.id}>
                <img
                  className="image lazy"
                  alt={gif.title}
                  width={gif.width}
                  height={gif.height}
                  data-src={getUrl(gif.id)}
                />
              </div>
            )
          )}
        </div>
        {loading && <div className="loader" />}
      </div>
    );
  }
}

export default App;
