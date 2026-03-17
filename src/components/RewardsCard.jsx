import TrendTriangleUp from '../assets/Product review 12/Trend triangle up.svg'
import LocalCashIcon from '../assets/24/24/local-cash.svg'
import './RewardsCard.css'

function RewardsCard() {
  return (
    <div className="card rewards-card-v3">
      <div className="card-header">
        <div className="card-header-info">
          <h3 className="card-title">Rewards</h3>
          <p className="card-subtitle rewards-card-subtext">Return rate after customers earn Local Cash.</p>
        </div>
      </div>
      <div className="rewards-metric-value-row">
        <span className="rewards-metric-value">7.5%</span>
        <span className="rewards-na-pill rewards-pill-green">
          <img src={TrendTriangleUp} alt="" className="trend-triangle-up" width="16" height="16" />
          <span>N/A</span>
        </span>
      </div>
      <hr className="card-divider" />
      <div className="rewards-card-body">
        <div className="rewards-metric-row">
          <div className="rewards-icon-box">
            <img src={LocalCashIcon} alt="" width="24" height="24" />
          </div>
          <span className="rewards-card-body-text">View reward impact to see how local cash drives customers to return.</span>
        </div>
      </div>
    </div>
  )
}

export default RewardsCard
