import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';

import IconButton from '~/components/utils/Button/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import { colors } from '~/styles/colors';

import DeliverymanItem from './DeliverymanItem';
import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDeliverymen() {
    setLoading(true);
    try {
      const response = await api.get('/deliveryman', {
        params: {
          page,
        },
      });

      setDeliverymen(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeliverymen();
  }, [page]);

  async function handleSearchDeliveryman(e) {
    setPage(1);
    setLoading(true);

    try {
      const response = await api.get('/deliveryman', {
        params: {
          q: e.target.value,
          page,
        },
      });

      setDeliverymen(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <Content>
          <HeaderList title="Managing Delivery men">
            <SearchInput
              onChange={handleSearchDeliveryman}
              type="text"
              placeholder="Search for delivery men"
            />
            <IconButton
              Icon={MdAdd}
              title="CREATE"
              action={() => history.push('/deliveryman/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliverymen.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Photo</strong>
              <strong>Name</strong>
              <strong>Email</strong>
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
              disabled={deliverymen.length < 5}
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
          <HeaderList title="Managing Delivery Men">
            <SearchInput
              onChange={handleSearchDeliveryman}
              type="text"
              placeholder="Managing Delivery Men"
            />
            <IconButton
              Icon={MdAdd}
              title="CREATE"
              action={() => history.push('/deliveryman/create')}
              type="button"
            />
          </HeaderList>

          <Grid null={!deliverymen.length > 0}>
            <section>
              <strong>ID</strong>
              <strong>Photo</strong>
              <strong>Name</strong>
              <strong>Email</strong>
              <strong>Actions</strong>
            </section>
            <EmptyField>
              <MdError size={86} color={colors.primary} />
              <span>
                Error loading, please try again later.
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
              disabled={deliverymen.length < 5}
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
        <HeaderList title="Managing Delivery Men">
          <SearchInput
            onChange={handleSearchDeliveryman}
            type="text"
            placeholder="Search for Delivery Men"
          />
          <IconButton
            Icon={MdAdd}
            title="CREATE"
            action={() => history.push('/deliveryman/create')}
            type="button"
          />
        </HeaderList>

        <Grid null={!deliverymen.length > 0}>
          <section>
            <strong>ID</strong>
            <strong>Photo</strong>
            <strong>Name</strong>
            <strong>Email</strong>
            <strong>Actions</strong>
          </section>
          {deliverymen.length > 0 ? (
            deliverymen.map(deliveryman => (
              <DeliverymanItem
                key={deliveryman.id}
                data={deliveryman}
                updateDeliveryman={loadDeliverymen}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>There are no delivery men</span>
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
            disabled={deliverymen.length < 5}
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
