import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import IconButton from '~/components/utils/Button/IconButton';
import HeaderList from '~/components/HeaderList';
import SearchInput from '~/components/Form/SearchInput';

import DeliveryItem from './DeliveryItem';
import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';

import { colors } from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDate(data) {
    return data.map(delivery => ({
      ...delivery,
      canceled_dateFormatted: delivery.canceled_at
        ? format(parseISO(delivery.canceled_at), 'dd/MM/yyyy')
        : null,
      start_dateFormatted: delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormatted: delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  async function handleSearchDelivery(e) {
    setLoading(true);
    setPage(1);
    try {
      const response = await api.get('/delivery', {
        params: {
          productFound: e.target.value,
          page,
        },
      });

      const data = formatDate(response.data);

      setDeliveries(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function loadDeliveries() {
    setLoading(true);
    try {
      const response = await api.get('/delivery', {
        params: {
          page,
        },
      });

      const data = formatDate(response.data);

      setDeliveries(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeliveries();
  }, [page]);

  if (loading) {
    return (
      <Container>
        <Content>
          <HeaderList title="Managing orders">
            <SearchInput
              onChange={handleSearchDelivery}
              type="text"
              placeholder="Search for orders"
            />
            <IconButton
              Icon={MdAdd}
              title="CREATE"
              action={() => history.push('/delivery/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliveries.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Recipient</strong>
              <strong>Deliveryman</strong>
              <strong>City</strong>
              <strong>State</strong>
              <strong>Status</strong>
              <strong>Actions</strong>
            </section>
            <LoadingField>
              <MdCached size={86} color={colors.primary} />
              <span>Loading...</span>
            </LoadingField>
          </Grid>
          <ButtonSection>
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              type="button"
            >
              <MdChevronLeft size={26} />{' '}
              <span style={{ marginRight: 5 }}>Back</span>
            </Button>
            <Button
              disabled={deliveries.length < 5}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <span style={{ marginLeft: 5 }}>Next</span>
              <MdChevronRight size={26} />
            </Button>
          </ButtonSection>
        </Content>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Content>
          <HeaderList title="Managing Orders">
            <SearchInput
              onChange={handleSearchDelivery}
              type="text"
              placeholder="Search for orders"
            />
            <IconButton
              Icon={MdAdd}
              title="CREATE"
              action={() => history.push('/delivery/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliveries.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Recipient</strong>
              <strong>Deliveryman</strong>
              <strong>City</strong>
              <strong>State</strong>
              <strong>Status</strong>
              <strong>Actions</strong>
            </section>
            <EmptyField>
              <MdError size={86} color={colors.primary} />
              <span>
                Error loading content, please try again later.
              </span>
            </EmptyField>
          </Grid>
          <ButtonSection>
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              type="button"
            >
              <MdChevronLeft size={26} />{' '}
              <span style={{ marginRight: 5 }}>Back</span>
            </Button>
            <Button
              disabled={deliveries.length < 5}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <span style={{ marginLeft: 5 }}>Next</span>
              <MdChevronRight size={26} />
            </Button>
          </ButtonSection>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <HeaderList title="Managing Orders">
          <SearchInput
            onChange={handleSearchDelivery}
            type="text"
            placeholder="Search for Orders"
          />
          <IconButton
            Icon={MdAdd}
            title="CREATE"
            action={() => history.push('/delivery/create')}
            type="button"
          />
        </HeaderList>

        <Grid null={!deliveries.length > 0}>
          <section>
            <strong>ID</strong>
            <strong>Recipient</strong>
            <strong>Deliveryman</strong>
            <strong>City</strong>
            <strong>State</strong>
            <strong>Status</strong>
            <strong>Actions</strong>
          </section>
          {deliveries.length > 0 ? (
            deliveries.map(delivery => (
              <DeliveryItem
                updateDeliveries={loadDeliveries}
                key={delivery.id}
                data={delivery}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>There are no orders</span>
            </EmptyField>
          )}
        </Grid>
        <ButtonSection>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            <MdChevronLeft size={26} />{' '}
            <span style={{ marginRight: 5 }}>Back</span>
          </Button>
          <Button
            disabled={deliveries.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            <span style={{ marginLeft: 5 }}>Next</span>
            <MdChevronRight size={26} />
          </Button>
        </ButtonSection>
      </Content>
    </Container>
  );
}
