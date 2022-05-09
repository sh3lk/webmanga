import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import MangaCard from './MangaCard';

// ----------------------------------------------------------------------

MangaList.propTypes = {
  list: PropTypes.array.isRequired
};

export default function MangaList({ list, ...props }) {
  return (
    <Grid container spacing={3} {...props}>
      {list.map((manga) => (
        <Grid key={manga.id} item xs={68} sm={3} md={2.4}>
          <MangaCard {...manga} />
        </Grid>
      ))}
    </Grid>
  );
}
