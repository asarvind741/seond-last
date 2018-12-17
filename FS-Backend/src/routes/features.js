import FeaturesController from '../controllers/features';
import passport from 'passport';
module.exports = app => {
    let features = '/features/';
    app.post(`${features}create`, FeaturesController.createFeatures);
    app.post(`${features}edit`, FeaturesController.editFeatures);
    app.post(`${features}delete`, FeaturesController.deleteFeatures);
    app.get(`${features}`, FeaturesController.getFeatures);
    app.post(`${features}status-modify`, FeaturesController.updateFeaturesStatus);
    app.get(`${features}role/:role`, FeaturesController.getFeaturesByRole);
    app.get(`${features}all/:role`, FeaturesController.getAllFeaturesByRole);

};