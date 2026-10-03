import { Modal, Rate, message } from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';
// import { findByIdAndUpdate } from '../../../../Server/models/reviewModels';
import { addReview } from '../../apis/review';
function ReviewModal({
  movie,
  reloadData,
  showReviewForm,
  setShowReviewForm,
  selectedReview,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const AddReview = async () => {
    try {
      console.log('movie', movie);
      dispatch(setLoading(true));
      // let response = null;
      // if (selectedReview) {
      //   response = await UpdateReview({
      //     _id: selectedReview._id,
      //     movie: movie._id,
      //     rating,
      //     comment,
      //   });
      // } else {
      const response = await addReview({
        movie: movie._id,
        rating,
        comment,
      });
      // }
      console.log('response', response);
      message?.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedReview) {
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
    }
  }, [selectedReview]);

  return (
    <Modal
      open={showReviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title={selectedReview ? 'Update Review' : 'Add Review'}
      onOk={AddReview}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex w-full'>
          <span className='font-semibold'>Movie : </span>
          <span className='ml-2 font-semibold'>{movie?.name}</span>
        </div>
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          allowHalf
          style={{ color: 'orange' }}
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Enter your comment here'
          cols='30'
          rows='10'
        ></textarea>
      </div>
    </Modal>
  );
}

ReviewModal.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  reloadData: PropTypes.func.isRequired,
  showReviewForm: PropTypes.bool.isRequired,
  setShowReviewForm: PropTypes.func.isRequired,
  selectedReview: PropTypes.shape({
    _id: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
};

export default ReviewModal;
