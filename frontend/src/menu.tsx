import { MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface MenuCompProps {
  currencies: any[];
  onSelect: (currency: any) => void;
}

const MenuComp: React.FC<MenuCompProps> = ({ currencies, onSelect }) => {
  // Формируем пункты меню на основе полученных валют
  const items: MenuProps['items'] = [
    {
      key: 'sub1',
      label: 'Криптовалюты',
      icon: <MailOutlined />,
      children: [
        {
          key: 'group1',
          label: 'Список валют',
          type: 'group',
          children: currencies.map((curr) => ({
            key: curr.id,          // ключ = id валюты
            label: curr.name,
          })),
        },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    // Находим валюту по ключу (id)
    const selected = currencies.find(c => String(c.id) === e.key);
    if (selected) {
      console.log('Выбрана валюта:', selected);
      onSelect(selected);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default MenuComp;