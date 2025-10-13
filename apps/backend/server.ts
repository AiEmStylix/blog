import app from './src/app';
import chalk from 'chalk';

const port = 3000;

app.listen(port, () => {
  console.log(chalk.cyan(`Example app listening on http://localhost:${port}`));
});
