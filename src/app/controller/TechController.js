import User from '../models/User';
import Tech from '../models/Tech';
import GlobalError from '../../errors/GlobalError';
import CreateTechsService from '../services/techs/CreateTechsService';

class TechController {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['name'],
        through: { attributes: ['user_id'] },
      },
    });

    if (!user) {
      throw new GlobalError('Usuário não encontrado', 204);
    }

    return res.json(user.techs);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const tech = await CreateTechsService.execute({
      user_id,
      name,
    });

    return res.status(201).json(tech);
  }

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new GlobalError('Usuário não encontrado', 204);
    }

    const tech = await User.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.json({ message: 'Usuário deletado com sucesso' });
  }
}

export default new TechController();
