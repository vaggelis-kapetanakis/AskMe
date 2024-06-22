import { Router } from 'express';
import checkAuth from '../middleware/check-auth';
import tagsController from '../controllers/tag-controller';

const router = Router();

router.use(checkAuth);

router.get('/:tid', tagsController.fetchTagsById);
router.get('/popular/tags', tagsController.fetchPopularTags);
router.get('/user/:uid', tagsController.getTagsByUserId);

export default router;
