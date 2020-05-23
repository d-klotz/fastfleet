import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    console.log('chegou aqui 1');

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    console.log('chegou aqui 2');


    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    console.log('chegou aqui 3');

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    console.log('chegou aqui 4');

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    console.log('chegou aqui');

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
