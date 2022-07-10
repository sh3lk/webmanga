import sharp from 'sharp';

const handler = async (req, res) => {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  const body = await result.body;

  const transformer =  sharp()
    .resize(Number(req.query.w || 700))
    .jpeg({ force: true, quality: Number(req.query.q || 80) });
  
  body.pipe(transformer).pipe(res);
};

export default handler;