import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';

const CardComp: React.FC<{ currency: any }> = ({ currency }) => {
  if (!currency) return <div>Загрузка...</div>;

  const price = currency.quote?.USD?.price;
  const percentChange = currency.quote?.USD?.percent_change_24h;
  const iconUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.gif`;

  const isPositive = percentChange >= 0;
  const changeColor = isPositive ? '#3f8600' : '#cf1322';
  const changeIcon = isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Space vertical size={16}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <img
                src={iconUrl}
                alt={currency.name}
                style={{ width: 24, height: 24 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24?text=?';
                }}
              />
              <span style={{ fontWeight: 500 }}>{currency.name} ({currency.symbol})</span>
            </div>
          }
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Price: {price ? `$${price.toLocaleString()}` : 'N/A'}</p>
          <p style={{ color: changeColor }}>
            {changeIcon} 24h change: {percentChange?.toFixed(2) ?? 'N/A'}%
          </p>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  );
};

export default CardComp;