import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MangaCard from './manga-card';


MangaList.propTypes = {
  list: PropTypes.array.isRequired
};

export default function MangaList({ list, ...props }) {
  return (
    <Grid container spacing={3} {...props}>
      {list.map(({id, attributes}) => (
        <Grid key={id} item xs={6} sm={3} md={2.4}>
          <MangaCard id={id} {...attributes} />
        </Grid>
      ))}
    </Grid>
  );
}
