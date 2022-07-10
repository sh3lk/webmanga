import config from 'sites-config';

const configMap = new Map(config.map(data => [data.host, data]));

export const getPaths = () => config.map(({host}) => ({params: {host}}));

export const getCommonProps = (host: string) => configMap.get(host);