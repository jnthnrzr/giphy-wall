import React, { Component } from 'react';
import cachedResponse from './freeline_project_description';

import './App.css';

const getUrl = id => `https://media2.giphy.com/media/${id}/200w.gif`;

class App extends Component {
  state = {
    data: [],
    gifs: [],
    offset: 0,
    loading: null,
  };

  loadData = offset => {
    fetch(`http://localhost:8000/api/gifs?offset=${offset}`)
      .then(response => response.json())
      .then(gifObject => this.onSetData(gifObject))
      .catch(error => console.log(error));
  };

  loadLocalData = () => {
    const { data } = cachedResponse;
    this.setState({ data });
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

  fetchNextPage = () => {
    const { offset } = this.state;
    this.loadData(offset);
    const newOffset = offset + 25;
    this.setState({
      offset: newOffset,
    });
  };

  onScroll = () => {
    this.handleLazyLoading();

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      this.setState({ loading: true });
      // this.fetchNextPage();
    }
  };

  handleLazyLoading = () => {
    let lazyloadThrottleTimeout;

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        const lazyloadImages = document.querySelectorAll('.lazy');
        lazyloadImages.forEach(img => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
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
    // this.loadLocalData();
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
            index < 8 ? (
              <img
                key={gif.id}
                className="image-item"
                alt={gif.title}
                width={gif.width}
                height={gif.height}
                src={getUrl(gif.id)}
              />
            ) : (
              <img
                key={gif.id}
                className="image-item lazy"
                alt={gif.title}
                width={gif.width}
                height={gif.height}
                data-src={getUrl(gif.id)}
              />
            )
          )}
        </div>
        {loading && <h2>Loading...</h2>}
      </div>
    );
  }
}

export default App;
