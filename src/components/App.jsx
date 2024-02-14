import { Component } from 'react';
import { Layout } from './Layout';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { fetchImages } from './pixabay-api';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Error } from './error/Error';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    query: '',
    page: 1,
    loadMore: false,
  };

  per_page = 12;

  handleSubmit = value => {
    this.setState(prevState => {
      if (prevState.query !== value) {
        return {
          query: value,
          page: 1,
          images: [],
        };
      }
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      try {
        this.setState({ loading: true, error: false });

        const { hits, totalHits } = await fetchImages(
          query,
          page,
          this.per_page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));

        if (totalHits < page * this.per_page) {
          this.setState({ loadMore: false });
        } else {
          this.setState({ loadMore: true });
        }
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { images, loading, loadMore, error } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {error && <Error />}
        {loadMore && <Button handleClick={this.handleLoadMore} />}
      </Layout>
    );
  }
}
