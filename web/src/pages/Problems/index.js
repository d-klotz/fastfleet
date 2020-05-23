import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdBlock,
  MdCached,
  MdError,
} from 'react-icons/md';

import api from '~/services/api';

import HeaderList from '~/components/HeaderList';
import ProblemItem from './ProblemItem';
import { Container, Content, Grid } from './styles';
import {
  ButtonSection,
  EmptyField,
  Button,
  LoadingField,
} from '~/styles/fields';
import { colors } from '~/styles/colors';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProblems() {
    setLoading(true);
    try {
      const response = await api.get('/delivery/problems', {
        params: {
          page,
        },
      });

      setProblems(response.data);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    loadProblems();
  }, [page]);

  if (loading) {
    return (
      <Container>
        <Content>
          <HeaderList title="Managing Problems" />
          <Grid null={!problems.length > 0}>
            <section>
              <strong>Order</strong>
              <strong>Problem</strong>
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
              disabled={problems.length < 5}
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
          <HeaderList title="Managing Problems" />
          <Grid null={!problems.length > 0}>
            <section>
              <strong>Order</strong>
              <strong>Problem</strong>
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
              disabled={problems.length < 5}
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
        <HeaderList title="Managing Problems" />
        <Grid null={!problems.length > 0}>
          <section>
            <strong>Order</strong>
            <strong>Problem</strong>
            <strong>Actions</strong>
          </section>
          {problems.length > 0 ? (
            problems.map(problem => (
              <ProblemItem
                updateProblems={loadProblems}
                key={problem.id}
                data={problem}
              />
            ))
          ) : (
            <EmptyField>
              <MdBlock size={86} color={colors.primary} />
              <span>There are no orders with problems.</span>
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
            disabled={problems.length < 5}
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
