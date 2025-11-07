import React from 'react';

interface OrderBookRow {
  price: number;
  quantity: number;
}

const dummyBidBook: OrderBookRow[] = [
  { price: 283500, quantity: 40 },
  { price: 283000, quantity: 7 },
  { price: 282500, quantity: 66 },
  { price: 282000, quantity: 44 },
  { price: 281500, quantity: 83 },
  { price: 281000, quantity: 34 },
  { price: 280500, quantity: 264 },
  { price: 280000, quantity: 1019 },
  { price: 279500, quantity: 367 },
  { price: 279000, quantity: 212 },
];

export const OrderForm: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('매수');
  const [orderType, setOrderType] = React.useState('현금');
  const [priceType, setPriceType] = React.useState('보통(지정가)');
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(280000);
  const [useMargin, setUseMargin] = React.useState(false);
  const [autoPrice, setAutoPrice] = React.useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const [percentDropdownOpen, setPercentDropdownOpen] = React.useState(false);
  const [selectedPercent, setSelectedPercent] = React.useState(100);

  const tabs = ['매수', '매도', '정정/취소', '미체결', '잔고'];
  const percentOptions = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  return (
    <div style={styles.container}>
      {/* Order Tabs */}
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? (tab === '매수' ? styles.tabActiveBuy : styles.tabActiveSell) : {}),
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Left Side - Order Book */}
        <div style={styles.orderBookSection}>
          <div style={styles.orderBookHeader}>
            <span style={styles.headerLabel}>호가</span>
            <span style={styles.redDot}>●</span>
            <span style={styles.headerLabel}>잔량</span>
          </div>

          <div style={styles.orderBook}>
            {dummyBidBook.map((row, index) => {
              const isCurrentPrice = row.price === 281500;
              const isHovered = hoveredRowIndex === index;
              const isSelected = selectedRowIndex === index;
              
              return (
                <div
                  key={index}
                  style={{
                    ...styles.orderRow,
                    ...(isCurrentPrice ? styles.currentPriceRow : {}),
                    ...(isSelected && !isCurrentPrice ? styles.orderRowSelected : {}),
                    ...(isHovered && !isCurrentPrice && !isSelected ? styles.orderRowHover : {}),
                  }}
                  onClick={() => {
                    setPrice(row.price);
                    setSelectedRowIndex(index);
                  }}
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                >
                  <span style={isCurrentPrice ? styles.currentPrice : styles.price}>
                    {row.price.toLocaleString()}
                  </span>
                  <span style={styles.quantity}>{row.quantity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Order Entry */}
        <div style={styles.orderEntrySection}>
          {/* Cash/Credit Toggle */}
          <div style={styles.typeToggle}>
            <button
              style={{
                ...styles.typeButton,
                ...(orderType === '현금' ? styles.typeButtonActive : {}),
              }}
              onClick={() => setOrderType('현금')}
            >
              현금
            </button>
            <button
              style={styles.typeButton}
              onClick={() => setOrderType('신용')}
            >
              신용
            </button>
          </div>

          {/* Price Type Selector */}
          <button style={styles.priceTypeSelector} onClick={() => {/* Open dropdown */}}>
            <span>{priceType}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Quantity Input */}
          <div style={styles.inputRow}>
            <button style={styles.minusButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              −
            </button>
            <div style={styles.inputCenter}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={styles.input}
              />
              <span style={styles.unit}>주</span>
            </div>
            <button style={styles.plusButton} onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          {/* Margin Options */}
          <div style={styles.marginRow}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={useMargin}
                onChange={(e) => setUseMargin(e.target.checked)}
              />
              <span style={styles.checkboxLabel}>미수수량</span>
            </label>
            
            <div style={styles.percentDropdownContainer}>
              <button 
                style={styles.percentDropdown} 
                onClick={() => setPercentDropdownOpen(!percentDropdownOpen)}
              >
                <span>{selectedPercent}%</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {percentDropdownOpen && (
                <div style={styles.percentDropdownMenu}>
                  {percentOptions.map((percent) => (
                    <button
                      key={percent}
                      style={{
                        ...styles.percentOption,
                        ...(selectedPercent === percent ? styles.percentOptionActive : {}),
                      }}
                      onClick={() => {
                        setSelectedPercent(percent);
                        setPercentDropdownOpen(false);
                      }}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button style={styles.availableButton} onClick={() => {/* Set max available */}}>
              가능
            </button>
          </div>

          {/* Price Input with Market Price Button */}
          <div style={styles.priceInputRow}>
            <button style={styles.priceMinusButton} onClick={() => setPrice(price - 500)}>
              −
            </button>
            <div style={styles.priceDisplay}>
              <span style={styles.priceValue}>{price.toLocaleString()}원</span>
            </div>
            <button style={styles.pricePlusButton} onClick={() => setPrice(price + 500)}>
              +
            </button>
            <button style={styles.marketPriceButton} onClick={() => {/* Set market price */}}>
              ✓ 시장가
            </button>
          </div>

          {/* Auto Price Options */}
          <div style={styles.autoPriceRow}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={autoPrice}
                onChange={(e) => setAutoPrice(e.target.checked)}
              />
              <span style={styles.checkboxLabel}>가격 자동(전체가)</span>
            </label>

            <button style={styles.quoteButton} onClick={() => {/* Open quote selector */}}>
              호가
            </button>
          </div>

          {/* Order Amount */}
          <div style={styles.orderAmount}>
            <span style={styles.sorLabel}>SOR 주문금액</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={styles.orderAmountValue}>{(price * quantity).toLocaleString()}원</span>
          </div>

          {/* Submit Button */}
          <button style={styles.submitButton} onClick={() => {/* Submit order */}}>
            현금매수
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  tabBar: {
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
  },
  tab: {
    flex: 1,
    padding: '14px 8px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  tabActiveBuy: {
    color: '#c2185b',
    borderBottom: '2px solid #c2185b',
  },
  tabActiveSell: {
    color: '#2196F3',
    borderBottom: '2px solid #2196F3',
  },
  mainContent: {
    display: 'flex',
    minHeight: '500px',
  },
  orderBookSection: {
    width: '160px',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
  },
  orderBookHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 8px',
    borderBottom: '1px solid #e0e0e0',
  },
  headerLabel: {
    fontSize: '13px',
    color: '#666',
  },
  redDot: {
    fontSize: '8px',
    color: '#ff4444',
  },
  orderBook: {
    flex: 1,
  },
  orderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  orderRowHover: {
    backgroundColor: '#f0f4ff',
    borderLeft: '2px solid #2196F3',
  },
  orderRowSelected: {
    backgroundColor: '#e3f2fd',
    borderLeft: '3px solid #2196F3',
    border: '1px solid #2196F3',
  },
  currentPriceRow: {
    backgroundColor: '#fff',
    border: '1px solid #c2185b',
    borderLeft: '3px solid #c2185b',
  },
  price: {
    fontSize: '15px',
    color: '#000',
  },
  currentPrice: {
    fontSize: '15px',
    color: '#c2185b',
  },
  quantity: {
    fontSize: '14px',
    color: '#666',
  },
  indexInfo: {
    padding: '8px 12px',
    borderTop: '1px solid #e0e0e0',
  },
  indexLabel: {
    fontSize: '13px',
    color: '#666',
  },
  orderEntrySection: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  typeToggle: {
    display: 'flex',
    gap: '8px',
  },
  typeButton: {
    flex: 1,
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
  },
  typeButtonActive: {
    border: '2px solid #000',
    color: '#000',
  },
  priceTypeSelector: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#000',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  minusButton: {
    width: '40px',
    height: '40px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '18px',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '8px 12px',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    textAlign: 'center',
    width: '60px',
  },
  unit: {
    fontSize: '14px',
    color: '#666',
  },
  plusButton: {
    width: '40px',
    height: '40px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '18px',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#000',
  },
  percentDropdownContainer: {
    position: 'relative',
  },
  percentDropdown: {
    padding: '8px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '70px',
    justifyContent: 'space-between',
  },
  percentDropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 1000,
    minWidth: '70px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  percentOption: {
    width: '100%',
    padding: '8px 16px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'block',
  },
  percentOptionActive: {
    backgroundColor: '#e3f2fd',
    color: '#2196F3',
  },
  availableButton: {
    padding: '8px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  priceInputRow: {
    display: 'flex',
    gap: '0px',
    alignItems: 'stretch',
    height: '48px',
  },
  priceMinusButton: {
    width: '48px',
    border: '1px solid #e0e0e0',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderRight: 'none',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceDisplay: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e0e0e0',
    borderLeft: 'none',
    borderRight: 'none',
    backgroundColor: '#fffbea',
  },
  priceValue: {
    fontSize: '18px',
    color: '#000',
  },
  pricePlusButton: {
    width: '48px',
    border: '1px solid #e0e0e0',
    borderRight: 'none',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketPriceButton: {
    width: '90px',
    border: '1px solid #e0e0e0',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#000',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },
  autoPriceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quoteButton: {
    padding: '8px 24px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  orderAmount: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 0',
  },
  sorLabel: {
    fontSize: '13px',
    color: '#666',
  },
  orderAmountValue: {
    fontSize: '15px',
    color: '#c2185b',
    marginLeft: 'auto',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#c2185b',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px',
  },
};
