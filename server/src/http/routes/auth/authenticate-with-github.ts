import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { env } from '../../../env';
import { db } from '../../../db';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const authenticateWithGithub: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with GitHub',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body;

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token'
      );

      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
      githubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET
      );
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
      );
      githubOAuthURL.searchParams.set('code', code);

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const githubAccessTokenData = await githubAccessTokenResponse.json();

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData);

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      });

      const githubUserData = await githubUserResponse.json();

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string(),
          email: z.string(),
        })
        .parse(githubUserData);

      if (email === null) {
        throw new Error(
          'Your GitHub account must have an email to authenticate.'
        );
      }
      let user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        const result = await db
          .insert(users)
          .values({
            name,
            email,
            avatarUrl,
            githubId,
          })
          .returning();

        user = result[0];
      }

      const token = await reply.jwtSign(
        {
          userId: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        }
      );

      reply.status(201).send({
        token,
      });
    }
  );
};
